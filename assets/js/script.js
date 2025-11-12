window.addEventListener("DOMContentLoaded", (e) => {

    const piezas = document.querySelectorAll(".pieza__puzzle");

    const huecos = document.querySelectorAll(".hueco__tablero");

    // Añadir un id único a cada pieza del puzzle

    piezas.forEach((pieza, i) => {

        pieza.dataset.id = i;
        pieza.id = "pieza-puzzle-" + i;

        pieza.addEventListener("dragstart", (e) => {
            const data = {
                id: pieza.id,
                dataId: pieza.dataset.id
            };

            e.dataTransfer.setData("text/plain", JSON.stringify(data));

            e.dataTransfer.effectAllowed = "move";
        });
    });

    // Añadir data-id correcto a huecos del tablero

    huecos.forEach((hueco, i) => {

        hueco.id = "hueco-" + i;
        hueco.dataset.id = i;

        hueco.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        hueco.addEventListener("drop", function (e) {

            e.preventDefault();

            let raw = e.dataTransfer.getData("text/plain");
            if (!raw) return;

            let data = JSON.parse(raw);
            const pieza = document.getElementById(data.id);

            if (!pieza) return;

            // Si el hueco está vacío
            if (this.children.length === 0) {

                // Si coinciden el hueco y la pieza
                if (this.dataset.id === data.dataId) {

                    this.appendChild(pieza);

                    // Ajustar pieza para que encaje
                    pieza.style.position = "static";
                    pieza.style.width = "100%";
                    pieza.style.height = "100%";
                    pieza.style.border = "none";
                    pieza.style.cursor = "default";
                    pieza.style.transform = "none";
                    pieza.setAttribute("draggable", false);
                    hueco.style.border = "none";

                    console.log(`Pieza ${data.dataId} colocada correctamente`);

                    // Mensaje al hacer el puzzle correctamente

                    const piezasColocadas = document.querySelectorAll('.pieza__puzzle[draggable="false"]').length;

                    const totalPiezas = 9;


                    if (piezasColocadas === totalPiezas) {

                        const mensaje = document.querySelector(".mensaje");
                        const layoutMensaje = document.querySelector(".layout__mensaje");

                        layoutMensaje.classList.add("mostrar__mensaje");

                        mensaje.textContent = "¡Enhorabuena! Has completado el puzzle";
                    }

                } else {

                    console.log(`Pieza incorrecta. Debe ir al hueco ${data.dataId}`);
                }

            } else {

                console.log("Este hueco ya está ocupado");
            }

        });
    });


    // Devuelve las piezas del puzzle a su lugar original

    const refresh = document.querySelector(".icon__refresh");

    refresh.addEventListener("click", () => {
        location.reload();
    });

});