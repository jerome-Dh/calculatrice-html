
/***

	@Auteur(s): Jérôme Dh <jdieuhou@gmail.com>
				
	@Description: Ce programme est une calculatrice standard permettant d'effectuer
					les opérations arithmétiques élémentaires sur les réels (16 chiffres maximum est autorisé)
	
	@Remerciement: Dr Noumsi

	@Dernière mise à jour : 06/05/16 à 22h
	
**/


//===============================================================
//
//		Variables globales
//
//===============================================================

var tMois = [
	"Janvier",
	"Février",
	"Mars",
	"Avril",
	"Mai",
	"Juin",
	"Juillet",
	"Août",
	"Septembre",
	"Octobre",
	"Novembre",
	"Décembre"
];
var mAjouter = true,
	mOperateurAppuye = false,
	sommeTemporaire = 0,
	mTypeOperation = 'A',
	nouveauCalcul = false, 
	zoneResult = document.getElementById("resultat"),
	premierNombre = false, 
	erreur = false, 
	derniereTouche = "",
	mMemoire = 0;


/*** 

	AFFICHER L'HEURE ET LA DATE (ACTUALISER CHAQUE SÉCONDE) 

**/


	
/**
 * PARTIE 1: ALLUMER/ETTEINDRE LA CALCULATRICE 
 */

function toucheEtteint(etat){

	//Désactiver/Activer les touches
	var touche = document.getElementsByTagName("input");
	for(var i = 0; i < touche.length; ++i){
		if(touche[i].className == "bNombre" || touche[i].className == "bFonction"){
			touche[i].disabled = etat;
		}
	}
	//Désactiver/Activer les buttons [Off/ON]
	document.getElementsByName("bOff")[0].disabled = etat;
	document.getElementsByName("bOn")[0].disabled = !etat;
	mAjouter = false;
	premierNombre = false;
	erreur = false;
	(etat) ? setResultat("") : setResultat("0");
	afficherMemoire(!etat);
	
}


//Désactiver toutes les touches au démarrage
toucheEtteint(true);

//Button [OFF]
document.getElementsByName("bOff")[0].onclick = function(){
	toucheEtteint(true);
};

//Button [ON]
document.getElementsByName("bOn")[0].onclick = function(){
	toucheEtteint(false);
};


/**
 * PARTIE 2: AFFICHER LES NOMBRES SUR L'ÉCRAN DE LA CALCULATRICE 
 */

//Le button Zéro
document.getElementsByName("bZero")[0].onclick = function(){
	mAjouter = true;
	setResultat("0");
};
document.getElementsByName("bUn")[0].onclick = function(){
	mAjouter = true;
	setResultat("1");
};
document.getElementsByName("bDeux")[0].onclick = function(){
	mAjouter = true;
	setResultat("2");
};
document.getElementsByName("bTrois")[0].onclick = function(){
	mAjouter = true;
	setResultat("3");
};
document.getElementsByName("bQuatre")[0].onclick = function(){
	mAjouter = true;
	setResultat("4");
};
document.getElementsByName("bCinq")[0].onclick = function(){
	mAjouter = true;
	setResultat("5");
};
document.getElementsByName("bSix")[0].onclick = function(){
	mAjouter = true;
	setResultat("6");
};
document.getElementsByName("bSept")[0].onclick = function(){
	mAjouter = true;
	setResultat("7");
};
document.getElementsByName("bHuit")[0].onclick = function(){
	mAjouter = true;
	setResultat("8");
};
document.getElementsByName("bNeuf")[0].onclick = testGGG;
function testGGG(){
	mAjouter = true;
	setResultat("9");
};

//Gestio de la virgule
document.getElementsByName("bVirgule")[0].onclick = function(){
	
	if(mOperateurAppuye)
	
		zoneResult.innerHTML = "0.";
	
	else{
	
		if(!isNaN(getResultat())){
			var chaine = getResultat().toString();
			if(chaine.indexOf(".") == -1)
				zoneResult.innerHTML = chaine + ".";
		}
	}
	mOperateurAppuye = false;
	erreur = false;
	
}

//Réinitialiser les résultats temporaires
document.getElementsByName("bClean")[0].onclick = function(){
	mAjouter = false;
	premierNombre = false;
	erreur = false;
	sommeTemporaire = 0;
	mNombre = 0;
	setResultat("0");
};

document.getElementsByName("bInit")[0].onclick = function(){
	mAjouter = false;
	premierNombre = false;
	erreur = false;
	sommeTemporaire = 0;
	mNombre = 0;
	setResultat("0");
};



/**
 * LES FONCTIONS ARITHMETIQUES
 */
function calculCommune(){
	
	mOperateurAppuye = true;
	if(erreur) //Si une erreur est affichée, on attent que l'utilisateur le réinitialise
		return;	
	
	if(!premierNombre){
		sommeTemporaire = getResultat();
		premierNombre = true;
	}else{
		if(mTypeOperation == 'A')
			sommeTemporaire += getResultat();
		else if(mTypeOperation == 'S')
			sommeTemporaire -= getResultat();
		else if(mTypeOperation == 'M')
			sommeTemporaire *= getResultat();
		else if(mTypeOperation == 'D'){
			if(getResultat())
				sommeTemporaire /= getResultat();
			else{
				zoneResult.innerHTML = "Err";
				erreur = true;
				return;
			}
		}
	}
	zoneResult.innerHTML = sommeTemporaire;

}
//L'addition
document.getElementsByName("bAddition")[0].onclick = function(){

	if(derniereTouche != "0"){
		calculCommune();
	}
	derniereTouche = "0";
	mTypeOperation = 'A';

};

//La soustraction
document.getElementsByName("bSoustraction")[0].onclick = function(){

	if(derniereTouche != "0"){
		calculCommune();
	}
	derniereTouche = "0";
	mTypeOperation = 'S';

};

//La multiplication
document.getElementsByName("bMultiplication")[0].onclick = function(){

	if(derniereTouche != "0"){
		calculCommune();
	}
	derniereTouche = "0";
	mTypeOperation = 'M';

};

//La division
document.getElementsByName("bDivision")[0].onclick = function(){

	if(derniereTouche != "0"){
		calculCommune();
	}
	derniereTouche = "0";
	mTypeOperation = 'D';

};

//Calculer le résultat
document.getElementsByName("bEgal")[0].onclick = function(){

	if(!mOperateurAppuye){
		calculCommune();
	}
	premierNombre = false;
	derniereTouche = "L";
}

//Calculer l'inverse
document.getElementsByName("bInverse")[0].onclick = function(){
		
	mOperateurAppuye = true;
	if(getResultat())
	{
		zoneResult.innerHTML = parseFloat(1.0 / getResultat());

	}else{
		zoneResult.innerHTML = "Err";
		erreur = true;
		return;
	}

};

//Obtenir la racine carrée
document.getElementsByName("bRacineCarree")[0].onclick = function(){
		
	mOperateurAppuye = true;
	if(getResultat() >= 0)
	{
		zoneResult.innerHTML = Math.sqrt(getResultat());
	}else{
		zoneResult.innerHTML = "Err";
		erreur = true;
		return;
	}

};

//Multiplier par (-1)
document.getElementsByName("bPlusMoins")[0].onclick = function(){

	if(getResultat())
	{
		zoneResult.innerHTML = (-1) * getResultat();
	}

};

//Diviser par 100
document.getElementsByName("bPourcentage")[0].onclick = function(){

	mOperateurAppuye = true;
	zoneResult.innerHTML = getResultat() / 100;

};

//Enlever le chiffre le plus à droite
document.getElementsByName("bDelete")[0].onclick = function(){

	if(getResultat()){
		var chaine = getResultat().toString();
		chaine = chaine.substring(0, chaine.length - 1);
		var n = (parseFloat(chaine)) ? parseFloat(chaine) : 0;
		zoneResult.innerHTML = n;
	}

};

//Prendre en compte les appuis de touches
document.getElementsByTagName("body")[0].onkeypress = function(e){

	//alert("" + String.fromCharCode(e.keyCode));

};


/**
 * Les utilitaires
 */

//Afficher un chiffres à l'écran
function setResultat(texte)
{
	var zoneResult = document.getElementById("resultat");	
	
	if(mOperateurAppuye || erreur)
	
		zoneResult.innerHTML = texte;
	
	else{
	
		if(mAjouter && zoneResult.innerHTML != "0"){
			if(zoneResult.innerHTML.length < 16){
				zoneResult.innerHTML += texte;
			}
		}else{
			zoneResult.innerHTML = texte;
		}
	
	}
	mOperateurAppuye = false;
	erreur = false;
	derniereTouche = "L";
	
}

/**
 * Obtenir le nombre actuellement affiché
 */
function getResultat()
{
	return parseFloat(document.getElementById("resultat").innerHTML);
}

function test()
{
	alert("Bonjour et Bienvenue dans la calculatrice");
}
//test();



/**
 * Gestion des FONCTIONS DE MÉMORISATION
 */

function afficherMemoire(etat)
{
	if(etat && mMemoire)
		document.getElementById("mMemoire").innerHTML = "M";
	else
		document.getElementById("mMemoire").innerHTML = "";

}

//Garder le nombre affiché en memoire
document.getElementsByName("bSetMemory")[0].onclick = function(){
	
	if(getResultat())
	{
		mMemoire = getResultat();
		afficherMemoire(mMemoire);
	}
	mOperateurAppuye = true;

};
document.getElementsByName("bCleanMemory")[0].onclick = function(){
	
	mMemoire = 0;
	afficherMemoire(mMemoire);
	
};
document.getElementsByName("bResetMemory")[0].onclick = function(){
	
	zoneResult.innerHTML = mMemoire;
	mOperateurAppuye = false;

};
document.getElementsByName("bMemoryPlus")[0].onclick = function(){
	
	if(getResultat())
	{
		mMemoire += getResultat();
		afficherMemoire(mMemoire);
	}
	mOperateurAppuye = true;

};

//Soustraire de la memoire
document.getElementsByName("bMemoryMoins")[0].onclick = function(){
	
	if(getResultat())
	{
		mMemoire -= getResultat();
		afficherMemoire(mMemoire);
	}
	mOperateurAppuye = true;
	
};



//===============================================================
//
//		Gestion de l'heure
//
//===============================================================

gererTemp();

setInterval(gererTemp, 1000);

function verifierNombre(n)
{
	return (n > 9) ? n : "0" + n;
}

function gererTemp()
{
	var mDate = new Date(), 
		mTemp = verifierNombre(mDate.getDate()) + " - " + tMois[mDate.getMonth()] + " - " + mDate.getFullYear() + " ";
		mTemp += " &nbsp; " + verifierNombre(mDate.getHours()) + ":" + verifierNombre(mDate.getMinutes()) + ":" + verifierNombre(mDate.getSeconds());
		document.getElementById("time").innerHTML = mTemp;
}


/*****
	
	FINFINFINFIN 	FIN		FIN			  	  FIN
	FINFINFINFIN	FIN		FIN	FIN			  FIN		   
	FIN			 	FIN		FIN	  FIN		  FIN
	FINFINFINFIN 	FIN	 	FIN		FIN  	  FIN	  
	FINFINFINFIN	FIN		FIN	 	  FIN	  FIN			
	FIN			 	FIN		FIN			FIN   FIN
	FIN 		 	FIN		FIN		      FIN FIN
	FIN				FIN		FIN			      FIN
	
	
	
	@by: Jerome Dh
	
**/
