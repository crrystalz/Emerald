module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Emerald is online!');
        client.user.setActivity(" made by crrystalz#0001")
    }
}