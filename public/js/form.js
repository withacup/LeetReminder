console.log('using form.js');
$('#goToSubmitPage').on('click', () => {
	console.log('submitting')
	window.location.href = "/sendMail";
});