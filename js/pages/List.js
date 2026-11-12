import { store } from "../main.js";
import { fetchEditors, fetchList } from "../content.js";
import { formatLength } from "../util.js";

import Spinner from "../components/Spinner.js";
import LevelAuthors from "../components/List/LevelAuthors.js";

const roleIconMap = {
    owner: "crown",
    admin: "user-gear",
    helper: "user-shield",
    dev: "code",
    trial: "user-lock",
};

export default {
    components: { Spinner, LevelAuthors },
    template: `
        <main v-if="loading">
            <Spinner></Spinner>
        </main>
        <main v-else class="page-list">
            <div class="list-container">
                <table class="list" v-if="list">
                    <tr v-for="([level, err], i) in list">
                        <td class="rank">
                            <p v-if="i + 1 <= 150" class="type-label-lg">#{{ i + 1 }}</p>
                            <p v-else class="type-label-lg">Legacy</p>
                        </td>
                        <td class="level" :class="{ 'active': selected == i, 'error': !level }">
                            <button @click="selected = i">
                                <span class="type-label-lg">{{ level?.name || \`Error (\${err}.json)\` }}</span>
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="level-container">
                <div class="level" v-if="level">
                    <div class="level-title">
                        <h1>{{ level.name }}</h1>
                        <div class="tags" v-if="level.tags.length">
                            <span v-for="tag in level.tags" class="tag type-label-md" :title="tagDescription(tag)">[{{ tag }}]</span>
                        </div>
                    </div>
                    <LevelAuthors :author="level.author" :creators="level.creators" :verifier="level.verifier"></LevelAuthors>
                    <ul class="stats">
                        <li>
                            <div class="type-title-sm">ID</div>
                            <p>{{ level.id || '—' }}</p>
                        </li>
                        <li>
                            <div class="type-title-sm">Password</div>
                            <p>{{ level.password || '—' }}</p>
                        </li>
                        <li>
                            <div class="type-title-sm">Difficulty</div>
                            <p><span v-if="level.difficulty" class="difficulty" :class="difficultyClass(level.difficulty)">{{ level.difficulty }}</span><template v-else>—</template></p>
                        </li>
                        <li>
                            <div class="type-title-sm">Length</div>
                            <p>{{ formatLength(level.length) }}</p>
                        </li>
                        <li>
                            <div class="type-title-sm">CPS</div>
                            <p>{{ level.cps || '—' }}</p>
                        </li>
                        <li>
                            <div class="type-title-sm">Type</div>
                            <p>{{ level.type || '—' }}</p>
                        </li>
                        <li>
                            <div class="type-title-sm">Tags</div>
                            <p v-if="level.tags.length">
                                <template v-for="(tag, ti) in level.tags">
                                    <span :title="tagDescription(tag)" class="tag-inline">[{{ tag }}]</span><span v-if="ti < level.tags.length - 1"> </span>
                                </template>
                            </p>
                            <p v-else>—</p>
                        </li>
                    </ul>
                    <p v-if="level.notes" class="notes">{{ level.notes }}</p>
                    <ul class="tag-legend" v-if="level.tags.length">
                        <li v-for="tag in level.tags" class="type-label-md">
                            <strong>[{{ tag }}]</strong> – {{ tagDescription(tag) || 'Unknown tag' }}
                        </li>
                    </ul>
                </div>
                <div v-else class="level" style="height: 100%; justify-content: center; align-items: center;">
                    <p>(ノಠ益ಠ)ノ彡┻━┻</p>
                </div>
            </div>
            <div class="meta-container">
                <div class="meta">
                    <div class="errors" v-show="errors.length > 0">
                        <p class="error" v-for="error of errors">{{ error }}</p>
                    </div>
                    <div class="og">
                        <p class="type-label-md">Website layout made by <a href="https://tsl.pages.dev/" target="_blank">TheShittyList</a></p>
                    </div>
                    <template v-if="editors">
                        <h3>List Editors</h3>
                        <ol class="editors">
                            <li v-for="editor in editors">
                                <img :src="\`assets/\${roleIconMap[editor.role] || 'user-shield'}\${store.dark ? '-dark' : ''}.svg\`" :alt="editor.role">
                                <a v-if="editor.link" class="type-label-lg link" target="_blank" :href="editor.link">{{ editor.name }}</a>
                                <p v-else>{{ editor.name }}</p>
                            </li>
                        </ol>
                    </template>
                    <h3>List Rules</h3>
                    <ol class="rules">
                        <li v-for="(rule, ri) in store.site.rules">
                            <span class="rule-num type-label-lg">{{ ri + 1 }}.</span>
                            <p>{{ rule }}</p>
                        </li>
                        <li v-if="store.site.tags.length">
                            <span class="rule-num type-label-lg">{{ store.site.rules.length + 1 }}.</span>
                            <div>
                                <p>These are the tags:</p>
                                <p v-for="tag in store.site.tags"><strong>[{{ tag.code }}]</strong> – {{ tag.description }}</p>
                            </div>
                        </li>
                    </ol>
                </div>
            </div>
        </main>
    `,
    data: () => ({
        list: [],
        editors: [],
        loading: true,
        selected: 0,
        errors: [],
        roleIconMap,
        store,
    }),
    computed: {
        level() {
            return this.list?.[this.selected]?.[0];
        },
    },
    async mounted() {
        this.list = await fetchList();
        this.editors = await fetchEditors();

        // Error handling
        if (!this.list) {
            this.errors = [
                "Failed to load list. Retry in a few minutes or notify list staff.",
            ];
        } else if (!this.editors) {
            this.errors.push("Failed to load list editors.");
        }

        this.loading = false;
    },
    methods: {
        formatLength,
        tagDescription(code) {
            return store.site.tags.find((t) => t.code === code)?.description || "";
        },
        difficultyClass(d) {
            return "difficulty--" + d.toLowerCase().replace(/[^a-z]/g, "");
        },
    },
};
