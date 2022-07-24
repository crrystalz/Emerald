module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        const activities = [
            "made by crrystalz#0001",
            "/help"
        ]
        console.log('Emerald is online!');
        var index = 0;
        setInterval(() => {
            const newActivity = activities[index];
            client.user.setActivity(newActivity);

            if (index == 0) {
                index = 1;
            }
            else {
                index = 0;
            }

        }, 5000);
    }
}