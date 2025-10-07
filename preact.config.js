import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config();

/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {object} env - options passed to CLI.
 * @param {WebpackConfigHelpers} helpers - object with useful helpers when working with config.
 **/
export default function (config, env, helpers) {
    // Basepath of lime-app in the router: http://thisnode.info/app/
    // This hack let us use less-modules at plugins/containers directories too
    const { source, isProd } = env;
    config.output.publicPath = isProd ? "/app/" : "";

    // Safe optimizations for LibreMesh deployment
    if (isProd) {
        // Disable source maps in production to reduce firmware size (saves ~6MB)
        config.devtool = false;

        // Enable basic optimizations without breaking HTML plugin
        if (config.optimization) {
            config.optimization.minimize = true;
            config.optimization.usedExports = true;
            config.optimization.sideEffects = false;

            // Advanced code splitting for bundle size optimization
            config.optimization.splitChunks = {
                chunks: "all",
                cacheGroups: {
                    // Separate Leaflet into its own chunk (saves ~80kB from main bundle)
                    leaflet: {
                        test: /[\\/]node_modules[\\/](leaflet|react-leaflet)/,
                        name: "leaflet-vendor",
                        priority: 30,
                        reuseExistingChunk: true,
                    },
                    // Separate React Query into its own chunk
                    reactQuery: {
                        test: /[\\/]node_modules[\\/]@tanstack[\\/]react-query/,
                        name: "react-query-vendor",
                        priority: 25,
                        reuseExistingChunk: true,
                    },
                    // Group other large vendors
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        priority: 10,
                        reuseExistingChunk: true,
                    },
                },
            };
        }
    }

    // Reduce noisy warnings in development (compatible with webpack 4)
    if (!isProd) {
        config.stats = {
            warnings: false,
            warningsFilter: [
                /Failed to parse source map/,
                /node_modules\/timeago\.js/,
                /source-map-loader/,
            ],
        };
    }

    const host = process.env.NODE_HOST || "10.13.0.1";
    config.devServer = {
        ...config.devServer,
        historyApiFallback: {
            index: "/index.html",
            disableDotRule: true,
        },
        proxy: [
            {
                path: "/ubus",
                target: `http://${host}/`,
            },
            {
                path: "/cgi-bin/**",
                target: `http://${host}/`,
            },
        ],
    };
    const loaderRules = helpers.getLoadersByName(config, "css-loader");
    loaderRules.forEach(({ rule }) => {
        if (rule.include) {
            rule.include.push(source("../plugins"));
            rule.include.push(source("containers"));
        }
        if (rule.exclude) {
            rule.exclude.push(source("../plugins"));
            rule.exclude.push(source("containers"));
        }
    });
    // Add common imports aliases
    (config.resolve.alias["~"] = path.resolve(__dirname, "src")),
        (config.resolve.alias.components = path.resolve(
            __dirname,
            "src/components"
        ));
    config.resolve.alias.containers = path.resolve(__dirname, "src/containers");
    config.resolve.alias.utils = path.resolve(__dirname, "src/utils");
    config.resolve.alias.plugins = path.resolve(__dirname, "plugins");
}
