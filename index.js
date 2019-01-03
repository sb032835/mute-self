module.exports = function MuteSelf(mod) {

  mod.command.add('math', {
    $none() {
		mod.settings.enabled = !mod.settings.enabled
		mod.command.message(`你他媽 ${mod.settings.enabled ? '<font color="#56B4E9">[閉嘴]' : '<font color="#E69F00">[打字小心點]'}`)
    },
    add(channel) {
		channel = Number(channel)
		let message
		if (!mod.settings.channels.includes(channel)) { 
			mod.settings.channels.push(channel)
		message = `[${channel}]<font color="#56B4E9"> 加入閉嘴清單 </font>`
		}
		mod.command.message(message)
    },
    remove(channel) {
		channel = Number(channel)
		if (mod.settings.channels.includes(channel)) {
			mod.settings.channels.splice(mod.settings.channels.indexOf(channel), 1);
			mod.command.message(`[${channel}]<font color="#E69F00"> 從閉嘴清單中移除 </font>`)
		}
    },
    clean() {
		mod.settings.channels = []
		mod.command.message(`<font color="#E69F00">清除所有閉嘴清單`)
    },
	list() {
		mod.command.message(`[一般-0] [組隊-1] [公會-2] [區域-3] [交易-4] [密語-7] [世界頻-27]`)
		mod.command.message(`[隊長通知-21] [攻擊隊隊長通知-25] [團隊-4] [指揮-22]`)
		mod.command.message(`[私人頻-11~18] [議價-19] `)
		mod.command.message(`[擴音器-213] [公會招募-214] [公告-24] [表情-26] [打招呼-9]`)
	}
  })

    mod.hook('C_CHAT', 1, { order: -100 }, (event) => {
        if (mod.settings.enabled && mod.settings.channels.includes(event.channel)) {
            mod.command.message('無法從該頻道發話'.clr('FF0000'));
            return false;
        }
    });
}