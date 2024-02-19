exports.run = (msg,client) => {
	const date = new Date();
	if (date.getHours() != 20 || date.getMinutes() != 37 || msg.guild == "1121125014096318615")
		return;
	msg.reply(
		'Pan kiedyś stanął nad brzegiem,\n'+
		'Szukał ludzi gotowych pójść za Nim;\n'+
		'By łowić serca\n'+
		'Słów Bożych prawdą.\n'+
		'Ref.: O Panie, to Ty na mnie spojrzałeś,\n'+
		'Twoje usta dziś wyrzekły me imię.\n'+
		'Swoją barkę pozostawiam na brzegu,\n'+
		'Razem z Tobą nowy zacznę dziś łów.\n'+
		'2. Jestem ubogim człowiekiem,\n'+
		'Moim skarbem są ręce gotowe\n'+
		'Do pracy z Tobą\n'+
		'I czyste serce.\n'+
		'Ref.: O Panie, to Ty na mnie spojrzałeś,\n'+
		'Twoje usta dziś wyrzekły me imię.\n'+
		'Swoją barkę pozostawiam na brzegu,\n'+
		'Razem z Tobą nowy zacznę dziś łów.\n'+
		'3. Ty, potrzebujesz mych dłoni,\n'+
		'Mego serca młodego zapałem\n'+
		'Mych kropli potu\n'+
		'I samotności.\n'+
		'Ref.: O Panie, to Ty na mnie spojrzałeś,\n'+
		'Twoje usta dziś wyrzekły me imię.\n'+
		'Swoją barkę pozostawiam na brzegu,\n'+
		'Razem z Tobą nowy zacznę dziś łów.\n'+
		'4. Dziś wypłyniemy już razem\n'+
		'Łowić serca na morzach dusz ludzkich\n'+
		'Twej prawdy siecią\n'+
		'I słowem życia.\n'+
		'Ref.: O Panie, to Ty na mnie spojrzałeś,\n'+
		'Twoje usta dziś wyrzekły me imię.\n'+
		'Swoją barkę pozostawiam na brzegu,\n'+
		'Razem z Tobą nowy zacznę dziś łów'
	)
}
