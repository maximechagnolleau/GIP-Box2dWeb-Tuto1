(function(){

	var box2dUtils;		// classe utilitaire
	var world; 			// "monde" 2dbox
	var canvas;			// notre canvas
	var canvasWidth;	// largeur du canvas
	var canvasHeight;	// hauteur du canvas
	var context;		// contexte 2d
	var SCALE = 30;		// �chelle

	// Initialisation
	$(document).ready(function() {
		init();
	});

	// Lancer � l'initialisation de la page
	this.init = function() {
		box2dUtils = new Box2dUtils(SCALE);	// instancier la classe utilitaire

		// R�cup�rer la canvas, ses propri�t�s et le contexte 2d
		canvas = $('#gipCanvas').get(0);
		canvasWidth = parseInt(canvas.width);
		canvasHeight = parseInt(canvas.height);
		context = canvas.getContext('2d');

		world = box2dUtils.createWorld(context); // box2DWorld

		// Cr�er le "sol" de notre environnement physique
		ground= box2dUtils.createBox(world, canvasWidth / 2, canvasHeight - 10, canvasWidth / 2, 10, true, 'ground');

		// Cr�er 2 box statiques
		staticBox = box2dUtils.createBox(world, 600, 450, 50, 50, true, 'staticBox');
		staticBox2 = box2dUtils.createBox(world, 200, 250, 80, 30, true, 'staticBox2');

		// Cr�er 2 ball statiques
		staticBall = box2dUtils.createBall(world, 50, 400, 50, true, 'staticBall');
		staticBall2 = box2dUtils.createBall(world, 500, 150, 60, true, 'staticBall2');

		// Cr�er 30 �l�ments ball dynamiques de diff�rentes tailles
		for (var i=0; i<30; i++) {
			var radius = 45;
			if (i < 10) {
				radius = 15;
			} else if (i < 20) {
				radius = 30;
			}
			// Placer al�atoirement les objets dans le canvas
			box2dUtils.createBall(world,
					Math.random() * canvasWidth,
					Math.random() * canvasHeight - 400,
					radius, false, 'ball'+i);
		}

		// Cr�er 30 �l�ments box dynamiques de diff�rentes tailles
		for (var i=0; i<30; i++) {
			var length = 45;
			if (i < 10) {
				length = 15;
			} else if (i < 20) {
				length = 30;
			}
			// Placer al�atoirement les objets dans le canvas
			box2dUtils.createBox(world,
					Math.random() * canvasWidth,
					Math.random() * canvasHeight - 400,
					length, length, false, 'ball'+i);
		}

		// Ex�cuter le rendu de l'environnement 2d
		window.setInterval(update, 1000 / 60);
	}

	// Mettre � jour le rendu de l'environnement 2d
	this.update = function() {
        // effectuer les simulations physiques et mettre � jour le canvas
		world.Step(1 / 60,  10, 10);
		world.DrawDebugData();
		world.ClearForces();
	}

}());