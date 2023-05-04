import winston from 'winston';

winston.addColors({
    critical: 'magenta',
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    verbose: 'grey',
    debug: 'green',
    silly: 'grey',
});

// TODO: Possibly add support for stack traces
const getParsedMessageByType = (
    message: string | Record<string, unknown> | Error
): string => {
    if (message instanceof Error) {
        return JSON.stringify(message, Object.getOwnPropertyNames(message), 2);
    }

    if (typeof message === 'string') {
        return message;
    }

    return JSON.stringify(message, null, 2);
};

const winstonFormatCustom = winston.format.printf((options) => {
    const { level, message, label, timestamp, extra } = options;
    const parsedMessages = [message, ...extra]
        .map(getParsedMessageByType)
        .join('\n');

    return winston.format
        .colorize()
        .colorize(level, `${timestamp} [${label}] ${level}: ${parsedMessages}`);
});

export const createLogger = (projectName: string) => {
    const logger = winston.createLogger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.label({ label: projectName }),
            winstonFormatCustom
        ),
    });

    const overwriteLogger = (
        type: keyof typeof logger,
        message: unknown,
        params: unknown[]
    ) => {
        logger[type].call(logger, message, {
            extra: params,
        });
    };

    console.debug = function (message: unknown, ...params) {
        overwriteLogger('debug', message, params);
    };
    console.log = function (message: unknown, ...params) {
        overwriteLogger('info', message, params);
    };
    console.info = function (message: unknown, ...params) {
        overwriteLogger('info', message, params);
    };
    console.warn = function (message: unknown, ...params) {
        overwriteLogger('warn', message, params);
    };
    console.error = function (message: unknown, ...params) {
        overwriteLogger('error', message, params);
    };

    return logger;
};
