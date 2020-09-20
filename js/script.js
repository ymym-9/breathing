// 波の音部分（Web Audio API） //

// AudioContextの生成
const context = new AudioContext();

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
