// 波の音部分（Web Audio API） //

// AudioContextの生成
// const context = new AudioContext();

// サウンドの読み込み
const loadSound = (url) => {
	return new Promise((resolve) => {
		// リクエストの生成
		const request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.responseType = 'arraybuffer';

		// 読み込み完了時に呼ばれる
		request.onload = () => {
			context.decodeAudioData(request.response, (buffer) => {
				resolve(buffer);
			});
		};
		request.send();
	});
};

// サウンドの再生
const playSound = (buffer) => {
	// Source
	const source = context.createBufferSource();
	source.buffer = buffer;

	// GainNode
	const gainNode = context.createGain();
	gainNode.gain.value = 0.05; // ボリュームを小さく
	source.connect(gainNode);

	// Destination
	source.connect(context.destination);

	// Sourceの再生
	source.start(0);
};

// メイン
(async () => {
	// サウンドの読み込み
	// const buffer = await loadSound('../audio/VSQSE_0587_sea_wave.mp3');
	// サウンドの再生
	// playSound(buffer);
})().catch((err) => console.error(err));

// アニメーション部分 //

$(function () {
	setInterval(function () {
		$('.circle').toggleClass('circle_full');
	}, 8000);
});

$('#toggle').click(function () {
	// console.log($(this).prop('checked'));
	if ($(this).prop('checked')) {
		$('label').css('background-color', '#66cdaa');
		$('label').removeClass('toggle_button');
		$('label').addClass('toggle_button_on');
		$('.wrapper').addClass('wrapper_dark');
		$('.circle_inline').addClass('circle_inline_dark');
		$('.circle_outline').addClass('circle_outline_dark');
		$('.contents').addClass('contents_dark');
		$('.toggle_text').addClass('toggle_text_dark');
	} else {
		$('label').css('background-color', '#ccc');
		$('label').addClass('toggle_button');
		$('label').removeClass('toggle_button_on');
		$('.wrapper').removeClass('wrapper_dark');
		$('.circle_inline').removeClass('circle_inline_dark');
		$('.circle_outline').removeClass('circle_outline_dark');
		$('.contents').removeClass('contents_dark');
		$('.toggle_text').removeClass('toggle_text_dark');
	}
});
