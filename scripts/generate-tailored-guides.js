"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var js_yaml_1 = __importDefault(require("js-yaml"));
var GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    console.error("Please set GEMINI_API_KEY environment variable.");
    process.exit(1);
}
function generateWithGemini(prompt_1) {
    return __awaiter(this, arguments, void 0, function (prompt, retries) {
        var url, _loop_1, i, state_1;
        if (retries === void 0) { retries = 3; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=".concat(GEMINI_API_KEY);
                    _loop_1 = function (i) {
                        var response, data, text, err_1;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 3, , 5]);
                                    return [4 /*yield*/, fetch(url, {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({
                                                contents: [{ parts: [{ text: prompt }] }],
                                                generationConfig: {
                                                    responseMimeType: "application/json"
                                                }
                                            })
                                        })];
                                case 1:
                                    response = _b.sent();
                                    if (!response.ok) {
                                        throw new Error("HTTP Error: ".concat(response.status, " ").concat(response.statusText));
                                    }
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    data = _b.sent();
                                    if (data.candidates && data.candidates.length > 0) {
                                        text = data.candidates[0].content.parts[0].text;
                                        return [2 /*return*/, { value: JSON.parse(text) }];
                                    }
                                    else {
                                        throw new Error("No candidates returned from Gemini");
                                    }
                                    return [3 /*break*/, 5];
                                case 3:
                                    err_1 = _b.sent();
                                    console.warn("Attempt ".concat(i + 1, " failed: ").concat(err_1.message, ". Retrying..."));
                                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 2000 * (i + 1)); })];
                                case 4:
                                    _b.sent(); // backoff
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < retries)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(i)];
                case 2:
                    state_1 = _a.sent();
                    if (typeof state_1 === "object")
                        return [2 /*return*/, state_1.value];
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: throw new Error("Failed to generate content after retries.");
            }
        });
    });
}
// Simple concurrency limiter
function asyncPool(poolLimit, array, iteratorFn) {
    return __awaiter(this, void 0, void 0, function () {
        var ret, executing, _loop_2, _i, array_1, item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ret = [];
                    executing = [];
                    _loop_2 = function (item) {
                        var p, e_1;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    p = Promise.resolve().then(function () { return iteratorFn(item); });
                                    ret.push(p);
                                    if (!(poolLimit <= array.length)) return [3 /*break*/, 2];
                                    e_1 = p.then(function () { return executing.splice(executing.indexOf(e_1), 1); });
                                    executing.push(e_1);
                                    if (!(executing.length >= poolLimit)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, Promise.race(executing)];
                                case 1:
                                    _b.sent();
                                    _b.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, array_1 = array;
                    _a.label = 1;
                case 1:
                    if (!(_i < array_1.length)) return [3 /*break*/, 4];
                    item = array_1[_i];
                    return [5 /*yield**/, _loop_2(item)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, Promise.all(ret)];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var yamlPath, yamlContent, config, targetNaics, guidesDir, tailoredDir, phaseFiles, allOriginalGuides, _i, phaseFiles_1, file, filePath, moduleContent, _loop_3, _a, targetNaics_1, category, customFiles, indexTsContent, _b, customFiles_1, file;
        var _this = this;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    console.log('Loading configuration...');
                    yamlPath = path_1.default.join(__dirname, '../launchadvisor.yaml');
                    yamlContent = fs_1.default.readFileSync(yamlPath, 'utf8');
                    config = js_yaml_1.default.load(yamlContent);
                    targetNaics = (_c = config === null || config === void 0 ? void 0 : config.audience_positioning) === null || _c === void 0 ? void 0 : _c.target_naics;
                    if (!targetNaics) {
                        console.error('Could not find target_naics in launchadvisor.yaml');
                        process.exit(1);
                    }
                    console.log("Found ".concat(targetNaics.length, " NAICS categories to target."));
                    guidesDir = path_1.default.join(__dirname, '../lib/data/guides');
                    tailoredDir = path_1.default.join(guidesDir, 'tailored');
                    if (!fs_1.default.existsSync(tailoredDir)) {
                        fs_1.default.mkdirSync(tailoredDir, { recursive: true });
                    }
                    require('ts-node').register({ transpileOnly: true, compilerOptions: { module: 'commonjs', moduleResolution: 'node' } });
                    phaseFiles = fs_1.default.readdirSync(guidesDir).filter(function (f) { return f.startsWith('phase-') && f.endsWith('.ts'); });
                    // Aggregate all original guides
                    console.log('Loading original guides...');
                    allOriginalGuides = [];
                    for (_i = 0, phaseFiles_1 = phaseFiles; _i < phaseFiles_1.length; _i++) {
                        file = phaseFiles_1[_i];
                        filePath = path_1.default.join(guidesDir, file);
                        delete require.cache[require.resolve(filePath)];
                        moduleContent = require(filePath);
                        if (moduleContent.guides) {
                            allOriginalGuides.push.apply(allOriginalGuides, moduleContent.guides);
                        }
                    }
                    console.log("Loaded ".concat(allOriginalGuides.length, " generic guides to process for each category.\n"));
                    _loop_3 = function (category) {
                        var categorySlug, categoryFilePath, existing, categoryGuides;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0:
                                    categorySlug = category.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                    categoryFilePath = path_1.default.join(tailoredDir, "".concat(categorySlug, ".json"));
                                    // Resume support - if file exists and has same length, skip
                                    if (fs_1.default.existsSync(categoryFilePath)) {
                                        try {
                                            existing = JSON.parse(fs_1.default.readFileSync(categoryFilePath, 'utf8'));
                                            if (existing.length >= allOriginalGuides.length) {
                                                console.log("Skipping ".concat(category.label, " - already fully generated."));
                                                return [2 /*return*/, "continue"];
                                            }
                                        }
                                        catch (e) { }
                                    }
                                    console.log("\n===========================================");
                                    console.log("Generating AI content batches for: ".concat(category.label));
                                    console.log("Description: ".concat(category.description));
                                    console.log("===========================================\n");
                                    categoryGuides = [];
                                    // Run parallel batches (concurrency of 5 to respect API rate limits)
                                    return [4 /*yield*/, asyncPool(5, allOriginalGuides, function (guide) { return __awaiter(_this, void 0, void 0, function () {
                                            var prompt, rewrittenJson, newGuide, err_2;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        console.log("  - Processing guide in background worker: ".concat(guide.title));
                                                        prompt = "\nYou are an expert small business launch advisor.\nWe are tailoring a generic business launch guide for a specific business type.\n\nTARGET BUSINESS TYPE: \nName: ".concat(category.label, "\nDescription: ").concat(category.description, "\n\nORIGINAL GUIDE:\nTitle: ").concat(guide.title, "\nPrimary Keyword: ").concat(guide.primaryKeyword, "\nIntro: ").concat(guide.intro, "\nSections:\n").concat(guide.sections.map(function (s) { return "## ".concat(s.heading, "\n").concat(s.body); }).join('\n\n'), "\n\nINSTRUCTIONS:\n1. Rewrite the Title, Meta Title, Meta Description, Primary Keyword, and Intro to specifically target this business type (e.g., instead of generic \"business\", use \"").concat(category.label, "\").\n2. Maximize high-intent, ready-to-purchase SEO keywords (long-tail) for this business type.\n3. Rewrite the body of each section so that the examples, costs, metrics, advice, and facts are HYPER-SPECIFIC to this industry. Use industry benchmarks, equipment names, or relevant operational norms.\n4. Adhere strictly to the LaunchAdvisor brand voice (practical, direct, no jargon, no motivational fluff, 8th-grade reading level).\n5. Output ONLY valid JSON matching the following structure EXACTLY:\n{\n  \"title\": \"...\",\n  \"metaTitle\": \"...\",\n  \"metaDescription\": \"...\",\n  \"primaryKeyword\": \"...\",\n  \"secondaryKeywords\": [\"...\", \"...\"],\n  \"intro\": \"...\",\n  \"sections\": [\n    { \"heading\": \"...\", \"body\": \"...\" }\n  ]\n}\n");
                                                        _a.label = 1;
                                                    case 1:
                                                        _a.trys.push([1, 3, , 4]);
                                                        return [4 /*yield*/, generateWithGemini(prompt)];
                                                    case 2:
                                                        rewrittenJson = _a.sent();
                                                        newGuide = __assign(__assign({}, guide), { slug: "".concat(guide.slug, "-").concat(categorySlug), title: rewrittenJson.title || guide.title, metaTitle: rewrittenJson.metaTitle || guide.metaTitle, metaDescription: rewrittenJson.metaDescription || guide.metaDescription, primaryKeyword: rewrittenJson.primaryKeyword || guide.primaryKeyword, secondaryKeywords: rewrittenJson.secondaryKeywords || guide.secondaryKeywords, intro: rewrittenJson.intro || guide.intro, sections: rewrittenJson.sections || guide.sections, businessTypes: [category.label] });
                                                        categoryGuides.push(newGuide);
                                                        return [3 /*break*/, 4];
                                                    case 3:
                                                        err_2 = _a.sent();
                                                        console.error("    [ERROR] Failed guide ".concat(guide.slug, ": ").concat(err_2.message, ". Falling back to default."));
                                                        categoryGuides.push(__assign(__assign({}, guide), { slug: "".concat(guide.slug, "-").concat(categorySlug), businessTypes: [category.label] }));
                                                        return [3 /*break*/, 4];
                                                    case 4:
                                                        // Save incrementally so progress isn't lost if the script terminates
                                                        fs_1.default.writeFileSync(categoryFilePath, JSON.stringify(categoryGuides, null, 2));
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); })];
                                case 1:
                                    // Run parallel batches (concurrency of 5 to respect API rate limits)
                                    _e.sent();
                                    console.log("Saved ".concat(categoryGuides.length, " AI-tailored guides to ").concat(categoryFilePath));
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _a = 0, targetNaics_1 = targetNaics;
                    _d.label = 1;
                case 1:
                    if (!(_a < targetNaics_1.length)) return [3 /*break*/, 4];
                    category = targetNaics_1[_a];
                    return [5 /*yield**/, _loop_3(category)];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    _a++;
                    return [3 /*break*/, 1];
                case 4:
                    customFiles = fs_1.default.readdirSync(tailoredDir).filter(function (f) { return f.endsWith('.json'); });
                    indexTsContent = "import type { Guide } from '../types';\n\n";
                    indexTsContent += "export const getTailoredGuides = (): Guide[] => {\n  const allGuides: Guide[] = [];\n";
                    for (_b = 0, customFiles_1 = customFiles; _b < customFiles_1.length; _b++) {
                        file = customFiles_1[_b];
                        indexTsContent += "  allGuides.push(...(require('./".concat(file, "')));\n");
                    }
                    indexTsContent += "  return allGuides;\n};\n";
                    fs_1.default.writeFileSync(path_1.default.join(tailoredDir, 'index.ts'), indexTsContent);
                    console.log('\\nAll parallel AI agent generation complete!');
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(console.error);
