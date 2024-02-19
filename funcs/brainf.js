function create(sett = [0,0,0]){
	return {
		settings:sett,
		data:[0],
		pointer:0,
		command:0,
		output:""
	}
}
exports.createinstance = create;

function runframe(ins,cmds,input){
	let depth;
	switch(cmds[ins.command]){
	case '+':
		ins.data[ins.pointer] += 1;
		if(ins.settings[2]==0)
			ins.data[ins.pointer] %=256;
		break;
	case '-':
		ins.data[ins.pointer] -= 1;
		if(ins.settings[2]==0)
			ins.data[ins.pointer] %=256;
		break;
	case '>':
		ins.pointer += 1;
		if(ins.data.length <= ins.pointer)
			ins.data.push(0);
		break;
	case '<':
		ins.pointer -= 1;
		break;
	case ',':
		if(ins.settings[0]==1){
			let el = input[0].split(/\s+/)[0]
			ins.data[ins.pointer] = Number(el);
			input[0] = input[0].slice(el.length+1);
		}else{
			ins.data[ins.pointer] = input[0].charCodeAt(0);
			input[0] = input[0].slice(1);
		}
		break;
	case '.':
		ins.output +=ins.settings[1]==1
			? ins.data[ins.pointer] + " "
			: String.fromCharCode(ins.data[ins.pointer]);
		break;
	case '[':
		if(ins.data[ins.pointer])
			break;
		depth = 1;
		while(depth>0){
			ins.command+=1;
			depth += cmds[ins.command]=='[';
			depth -= cmds[ins.command]==']';
		}
		break;
	case ']':
		if(!ins.data[ins.pointer])
			break;
		depth = 1;
		while(depth>0){
			ins.command-=1;
			depth -= cmds[ins.command]=='[';
			depth += cmds[ins.command]==']';
		}
		break;
	}
	//console.log(`${ins.data} ${ins.command} ${ins.pointer} `)
	ins.command+=1;
	return ins.command < cmds.length;
}
exports.runframe = runframe;

exports.wholesim = (settings, runtime, input, code) => {
	let instance = create(settings);
	let cont = true;
	for(let x=0;(x<runtime||runtime==-1)&&cont;x++)
		runframe(instance,code,input);
	return instance.output;
}
