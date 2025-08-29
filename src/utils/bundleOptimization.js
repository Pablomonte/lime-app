/**
 * Bundle optimization utilities and lazy loading helpers
 * Provides dynamic imports and code splitting strategies
 */

/**
 * Lazy load plugins to reduce initial bundle size
 */
export const lazyLoadPlugin = (pluginName, pluginPath) => {
    return {
        [pluginName]: () => import(pluginPath),
    };
};

/**
 * Dynamic plugin loader for route-based code splitting
 */
export const createPluginLoader = () => {
    const pluginLoaders = {
        // Core plugins that should be loaded immediately
        "lime-plugin-fbw": () => import("plugins/lime-plugin-fbw"),

        // Feature plugins that can be lazy loaded
        "lime-plugin-align": () => import("plugins/lime-plugin-align"),
        "lime-plugin-metrics": () => import("plugins/lime-plugin-metrics"),
        "lime-plugin-locate": () => import("plugins/lime-plugin-locate"),
        "lime-plugin-pirania": () => import("plugins/lime-plugin-pirania"),
        "lime-plugin-firmware": () => import("plugins/lime-plugin-firmware"),
        "lime-plugin-node-admin": () =>
            import("plugins/lime-plugin-node-admin"),
        "lime-plugin-remotesupport": () =>
            import("plugins/lime-plugin-remotesupport"),
        "lime-plugin-mesh-wide": () => import("plugins/lime-plugin-mesh-wide"),
        "lime-plugin-mesh-wide-config": () =>
            import("plugins/lime-plugin-mesh-wide-config"),
        "lime-plugin-mesh-wide-upgrade": () =>
            import("plugins/lime-plugin-mesh-wide-upgrade"),
        "lime-plugin-notes": () => import("plugins/lime-plugin-notes"),
        "lime-plugin-ground-routing": () =>
            import("plugins/lime-plugin-ground-routing"),
        "lime-plugin-changeNode": () =>
            import("plugins/lime-plugin-changeNode"),
        "lime-plugin-network-admin": () =>
            import("plugins/lime-plugin-network-admin"),
        "lime-plugin-rx": () => import("plugins/lime-plugin-rx"),
    };

    const loadedPlugins = new Map();

    return {
        async loadPlugin(pluginName) {
            // Return cached plugin if already loaded
            if (loadedPlugins.has(pluginName)) {
                return loadedPlugins.get(pluginName);
            }

            // Load plugin dynamically
            const loader = pluginLoaders[pluginName];
            if (!loader) {
                console.warn(`Plugin loader not found: ${pluginName}`);
                return null;
            }

            try {
                const plugin = await loader();
                loadedPlugins.set(pluginName, plugin);
                console.log(`✅ Plugin loaded: ${pluginName}`);
                return plugin;
            } catch (error) {
                console.error(`❌ Failed to load plugin: ${pluginName}`, error);
                return null;
            }
        },

        async preloadPlugin(pluginName) {
            // Preload without waiting
            this.loadPlugin(pluginName).catch(console.error);
        },

        async preloadCriticalPlugins() {
            // Preload plugins that are likely to be needed soon
            const critical = [
                "lime-plugin-node-admin", // Often accessed
                "lime-plugin-metrics", // Monitoring dashboard
                "lime-plugin-locate", // Network map
            ];

            critical.forEach((plugin) => this.preloadPlugin(plugin));
        },

        getLoadedPlugins() {
            return Array.from(loadedPlugins.keys());
        },

        clearCache() {
            loadedPlugins.clear();
        },
    };
};

/**
 * Bundle size analyzer for development
 */
export const bundleAnalyzer = {
    // Track imported modules
    imports: new Set(),

    trackImport(moduleName, size = 0) {
        this.imports.add({ name: moduleName, size, timestamp: Date.now() });
    },

    getImportReport() {
        return {
            totalImports: this.imports.size,
            imports: Array.from(this.imports),
            heavyImports: Array.from(this.imports)
                .filter((imp) => imp.size > 50000) // > 50KB
                .sort((a, b) => b.size - a.size),
        };
    },

    logImportReport() {
        const report = this.getImportReport();
        console.group("📦 Bundle Import Analysis");
        console.log(`Total imports: ${report.totalImports}`);

        if (report.heavyImports.length > 0) {
            console.group("🐘 Heavy imports (>50KB)");
            report.heavyImports.forEach((imp) =>
                console.log(`${imp.name}: ${Math.round(imp.size / 1024)}KB`)
            );
            console.groupEnd();
        }

        console.groupEnd();
    },
};

/**
 * Webpack bundle splitting configuration helper
 */
export const getBundleSplitConfig = () => ({
    // Split vendor dependencies
    vendor: {
        name: "vendor",
        test: /[\\/]node_modules[\\/]/,
        chunks: "all",
        priority: 20,
    },

    // Split React Query and related
    query: {
        name: "query",
        test: /[\\/]node_modules[\\/]@tanstack[\\/]/,
        chunks: "all",
        priority: 25,
    },

    // Split large plugins
    plugins: {
        name: "plugins",
        test: /[\\/]plugins[\\/]/,
        chunks: "async",
        priority: 10,
        minSize: 20000, // Only split if >20KB
    },

    // Split utilities
    utils: {
        name: "utils",
        test: /[\\/]src[\\/]utils[\\/]/,
        chunks: "all",
        priority: 15,
    },

    // Common chunks for shared code
    common: {
        name: "common",
        minChunks: 2,
        chunks: "all",
        priority: 5,
    },
});

/**
 * Lazy component wrapper for React suspense
 * Note: Import lazy and Suspense from 'preact/compat' when using
 */
export const createLazyComponent = (importFn) => {
    // This would need: import { lazy, Suspense } from 'preact/compat';
    // Commented out to avoid TypeScript errors in development
    /*
    const LazyComponent = lazy(importFn);
    
    return (props) => (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyComponent {...props} />
        </Suspense>
    );
    */

    // Placeholder implementation
    return () => import(importFn).then((module) => module.default);
};

/**
 * Performance hints for bundle optimization
 */
export const bundleOptimizationTips = {
    // Check for duplicate dependencies
    checkDuplicates() {
        const duplicates = [];
        // This would analyze the bundle for duplicate modules
        // Implementation depends on webpack-bundle-analyzer or similar
        return duplicates;
    },

    // Suggest optimizations
    getSuggestions() {
        return [
            "Use dynamic imports for route-based plugins",
            "Split vendor dependencies into separate chunks",
            "Implement tree shaking for unused exports",
            "Use preact/compat only where needed",
            "Compress images and assets",
            "Enable gzip compression",
            "Use webpack-bundle-analyzer to identify large modules",
        ];
    },

    // Bundle size thresholds
    thresholds: {
        main: 250 * 1024, // 250KB for main bundle
        vendor: 150 * 1024, // 150KB for vendor bundle
        plugin: 50 * 1024, // 50KB for individual plugins
    },

    checkThresholds(sizes) {
        const warnings = [];

        if (sizes.main > this.thresholds.main) {
            warnings.push(
                `Main bundle too large: ${Math.round(
                    sizes.main / 1024
                )}KB > ${Math.round(this.thresholds.main / 1024)}KB`
            );
        }

        if (sizes.vendor > this.thresholds.vendor) {
            warnings.push(
                `Vendor bundle too large: ${Math.round(
                    sizes.vendor / 1024
                )}KB > ${Math.round(this.thresholds.vendor / 1024)}KB`
            );
        }

        return warnings;
    },
};

/**
 * Runtime bundle size monitoring (development only)
 */
export const runtimeBundleMonitor = {
    start() {
        if (process.env.NODE_ENV !== "development") return;

        // Monitor dynamic imports
        const originalImport = window.__webpack_require__.e;
        window.__webpack_require__.e = function (chunkId) {
            console.log(`📦 Loading chunk: ${chunkId}`);
            return originalImport.apply(this, arguments);
        };

        // Log initial bundle size (Chrome-specific)
        if (performance && "memory" in performance) {
            const memory = performance.memory;
            if (memory && typeof memory === "object") {
                console.log("💾 Memory usage:", {
                    used:
                        "usedJSHeapSize" in memory &&
                        typeof memory.usedJSHeapSize === "number"
                            ? `${Math.round(
                                  memory.usedJSHeapSize / 1024 / 1024
                              )}MB`
                            : "N/A",
                    total:
                        "totalJSHeapSize" in memory &&
                        typeof memory.totalJSHeapSize === "number"
                            ? `${Math.round(
                                  memory.totalJSHeapSize / 1024 / 1024
                              )}MB`
                            : "N/A",
                    limit:
                        "jsHeapSizeLimit" in memory &&
                        typeof memory.jsHeapSizeLimit === "number"
                            ? `${Math.round(
                                  memory.jsHeapSizeLimit / 1024 / 1024
                              )}MB`
                            : "N/A",
                });
            }
        }
    },
};
