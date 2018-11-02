function init(url1, url2,id){
	var xml = loadXML(url1);
	var xsl = loadXML(url2);
	transform(xml, xsl, id);
}
function loadXML(url) {
	var xhr;
	// code pour Firefox
	if (document.implementation.createDocument) {
		xhr = new XMLHttpRequest();
		xhr.open('GET', url, false);
		xhr.send(null);
		if (xhr.readyState == 4) {
			xhr = xhr.responseXML;
		}
	}
	// code pour IE7
	else if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
		xhr.open('GET', url, false);
		xhr.send(null);
		if (xhr.readyState == 4) {
			xhr = xhr.responseXML;
		}
	}
	// code pour IE6, IE5.5 et IE5
	else if (window.ActiveXObject) {
		var xhr = new ActiveXObject("Microsoft.XMLDOM");
		xhr.async = false;
		xhr.load(url);
	}
	return xhr;
}
function transform(xml, xsl, id){
	if (window.XSLTProcessor) {
		var fragment;
		var xsltProcessor = new XSLTProcessor();
		xsltProcessor.importStylesheet(xsl);
		fragment = xsltProcessor.transformToFragment(xml, document);
		var target = document.getElementById(id);
		target.innerHTML="";
		target.appendChild(fragment);
		document.appendChild(target);
	}
	else if (window.ActiveXObject) {
		var target = document.getElementById(id);
		target.innerHTML = xml.transformNode(xsl);
	}
}
/* ancienne définition de la fonction : les libellés sont codés en dur dans le script
function fformulaire(form) {
	var ordre = null;
	var tri = new Array();
		tri[0]="ipp";
		tri[1]="ip";
		tri[2]="dns";
		tri[3]="BAC";
		tri[4]="modele";
		tri[5]="MAC";
		tri[6]="sn";
		tri[7]="prise";
		tri[8]="port";
		
	if (form.ordre[0].checked) {
		ordre=form.ordre[0].value;
	} else if (form.ordre[1].checked) {
		ordre=form.ordre[1].value;
	}
	extraire('ipp' + ordre + tri[form.tri.selectedIndex] + '.txt');
	init('ipp.xml', 'ipp' + ordre + tri[form.tri.selectedIndex] + '.xsl', 'transform');
} */
function formulaire(form) {
// nouvelle définition de la fonction : les libellés sont récupérés d'après l'option "value" de chaque ligne "option" de la partie "select" nommée "tri" dans le formulaire
	var ordre = null;
	var index = form.tri.selectedIndex;
	var valeur =  form.tri[index].value;
		
	if (form.ordre[0].checked) {
		ordre=form.ordre[0].value;
	} else if (form.ordre[1].checked) {
		ordre=form.ordre[1].value;
	}
//	alert('extraire ');
	extraire('proj' + ordre + valeur + '.txt');
//	alert('init');
	init('projexped.xml', 'proj' + ordre + valeur + '.xsl', 'transform');
}

function afficher(texte) {
//	alert("afficher " + texte);
	var target = document.getElementById("affichage");
	target.innerHTML = texte;
}
var xhr = null;
function extraire(fichier){
//	alert("extraire " + fichier);
	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
//		alert("window.XMLHttpRequest");
	}
	else if(window.ActiveXObject){
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
//		alert("Microsoft.XMLHTTP");
	}
	else{
		alert("Votre navigateur n'est pas compatible avec Ajax...");
	}
	if (xhr) {
//		alert("xhr");
		xhr.onreadystatechange = function(){
//					var texte = "readyState " + xhr.readyState + "\nstatus " + xhr.status + "\n reponse '" + xhr.responseText + "'";
					// var texte = "readyState " + xhr.readyState ;
					// if (xhr.readyState == 4) {
						// texte = texte  + "\nstatus " + xhr.status + "\n reponse '" + xhr.responseText + "'";
					// }
				// alert(texte);
			if(xhr.readyState == 4){
				if(xhr.status == 200) {
					var txtdocument = xhr.responseText;
					afficher(txtdocument);
				}
				else{
					var txtdocument = xhr.responseText;
					txtdocument = txtdocument + "\nstatus " + xhr.status
					afficher(txtdocument);
				}
			}
		}
//				afficher("Ma première fonction JavaScript extraire getElementById");
		xhr.open("GET", fichier , true);
		xhr.send(null);
	}
	else{
		alert("no xhr");
	}
}