const text = document.getElementById( 'popup-text' );
const popup = document.getElementById( 'popup-button' );
const reset = document.getElementById( 'popup-reset' );
const counter = document.getElementById( 'popup-count' );

chrome.storage.local.get( ['popupCount'], data => {
	let value = data.popupCount || 0;
	counter.innerHTML = value;
} );

chrome.storage.onChanged.addListener( ( changes, namespace ) => {
	if ( changes.popupCount ) {
		let value = changes.popupCount.newValue || 0;
		counter.innerHTML = value;
	}
});

reset.addEventListener( 'click', () => {
	chrome.storage.local.clear();
	text.value = '';
} );

popup.addEventListener( 'click', () => {
	chrome.runtime.sendMessage( '', {
		type: 'notification',
		message: text.value
	});
} );