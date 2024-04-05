//This code is intended to go in the page you have placed your input and button element. Please note the name of the backend file and any id's so you may update accordingly

import { generateDownloadLink } from 'backend/generatePdf.web'

$w.onReady(function () {
$w('#fileName').onInput(() => {
	if($w('#fileName').valid){
		$w('#btnPdf').enable()
	}
})

$w('#btnPdf').onClick(async() => {
	$w('#btnPdf').label = "Please wait..."
	$w('#btnPdf').disable()
	let downloadUrl = await generateDownloadLink($w('#fileName').value)


	if(downloadUrl){
		$w('#btnPdf').link = downloadUrl
		$w('#btnPdf').label = "Click to Download"
		$w('#btnPdf').enable()
	}
})

});
