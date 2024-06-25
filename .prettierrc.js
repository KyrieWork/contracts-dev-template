module.exports = {
  overrides: [
    {
      files: "*.sol",
      options: {
        tabWidth: 4,
        printWidth: 120,
        bracketSpacing: true,
        // compiler: "0.8.17",
      },
    },
    // ts
    {
      files: "*.ts",
      options: {
        tabWidth: 2,
        printWidth: 120,
        bracketSpacing: true,
      },
    },
  ],
};
