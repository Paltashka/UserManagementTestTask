export default () => ({
  seed: {
    usersTarget: Number(process.env.USERS_SEED_TARGET ?? 2_000_000),
    usersBatch: Number(process.env.USERS_SEED_BATCH ?? 20_000),
  },
});
