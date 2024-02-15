chrome.runtime.onMessage.addListener( data => {
	if ( data.type === 'notification' ) {
		popup( data.message );
	}
});

chrome.runtime.onInstalled.addListener( () => {
	chrome.contextMenus.create({
		id: 'popup',
		title: "PopUp!: %s", 
		contexts:[ "selection" ]
	});
});

chrome.contextMenus.onClicked.addListener( ( info, tab ) => {
	if ( 'popup' === info.menuItemId ) {
		popup( info.selectionText );
	}
} );

const popup = message => {
	chrome.storage.local.get( ['popupCount'], data => {
		let value = data.popupCount || 0;
		chrome.storage.local.set({ 'popupCount': Number( value ) + 1 });
	} );

	return chrome.notifications.create(
		'',
		{
			type: 'basic',
			title: 'PopUp!',
			message: message || 'PopUp!',
			iconUrl: 'popup.png',
		}
	);
};