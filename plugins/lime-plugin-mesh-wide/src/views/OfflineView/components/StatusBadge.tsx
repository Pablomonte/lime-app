/**
 * Status badge component for showing node/link health
 */
export const StatusBadge = ({
    status,
}: {
    status: "healthy" | "warning" | "down" | "new";
}) => {
    const configs = {
        healthy: {
            icon: "✅",
            text: "Healthy",
            className: "bg-green-100 text-green-700 border-green-600",
        },
        warning: {
            icon: "⚠️",
            text: "Warning",
            className: "bg-yellow-100 text-yellow-700 border-yellow-600",
        },
        down: {
            icon: "❌",
            text: "Down",
            className: "bg-red-100 text-red-700 border-red-600",
        },
        new: {
            icon: "🆕",
            text: "New",
            className: "bg-blue-100 text-blue-700 border-blue-600",
        },
    };

    const config = configs[status];

    return (
        <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-sm font-semibold ${config.className}`}
        >
            <span>{config.icon}</span>
            <span>{config.text}</span>
        </span>
    );
};
