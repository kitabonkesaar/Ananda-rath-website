/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as ai from "../ai.js";
import type * as blog from "../blog.js";
import type * as gallery from "../gallery.js";
import type * as heroConfig from "../heroConfig.js";
import type * as inquiries from "../inquiries.js";
import type * as packages from "../packages.js";
import type * as seed from "../seed.js";
import type * as seedBlogs from "../seedBlogs.js";
import type * as testimonials from "../testimonials.js";
import type * as videoTestimonials from "../videoTestimonials.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  ai: typeof ai;
  blog: typeof blog;
  gallery: typeof gallery;
  heroConfig: typeof heroConfig;
  inquiries: typeof inquiries;
  packages: typeof packages;
  seed: typeof seed;
  seedBlogs: typeof seedBlogs;
  testimonials: typeof testimonials;
  videoTestimonials: typeof videoTestimonials;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
