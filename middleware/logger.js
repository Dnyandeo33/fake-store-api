import chalk from 'chalk';

const logger = (req, res, next) => {
    const url = chalk.green(req.url);
    const method = chalk.green(req.method);
    const status = chalk.red(res.statusCode);
    console.log(`status:${status} -- method:${method} -- url: ${url}`);
    next();
};

export default logger;
