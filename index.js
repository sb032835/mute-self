module.exports = function MuteSelf(mod) {
	const command = mod.command || mod.require.command;
    const config = require('./config.js');
        
	let enabled = true;
	
    mod.hook('C_CHAT', 1, { order: -100 }, (event) => {
        if (enabled && config && config.channels.includes(event.channel)) {
            command.message('You have muted yourself from this channel');
            return false;
        }
    });
		
    command.add(['muteself', 'muteme'], (arg) => {
        if (!arg) {
            enabled = !enabled;
        } else if (arg.toLowerCase() === 'on') {
            enabled = true;
        } else if (arg.toLowerCase() === 'off') {
            enabled = false;
        }
        command.message(enabled ? 'Enabled' : 'Disabled');
    });
}
