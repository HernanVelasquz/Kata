const d = document,
    $table = d.querySelector(".crud-table"),
    $form = d.querySelector(".crud-form"),
    $title = d.querySelector(".crud-title"),
    $template = d.getElementById("crud-template").content,
    $fragment = d.createDocumentFragment();

/**
 * Funcion encargada de la informacion de la Api
 */
const getAll = async () => {
    try {
        let res = await axios.get("http://localhost:5555/santos"),
            json = await res.data;
        console.log(json);
        json.forEach(el => {
            $template.querySelector(".name").textContent = el.nombre;
            $template.querySelector(".constellation").textContent = el.constelacion;
            $template.querySelector(".edit").dataset.id = el.id;
            $template.querySelector(".edit").dataset.name = el.nombre;
            $template.querySelector(".edit").dataset.constellation = el.constelacion;
            $template.querySelector(".delete").dataset.id = el.id;

            let $clone = d.importNode($template, true);
            $fragment.appendChild($clone);
        });
        $table.querySelector("tbody").appendChild($fragment);
    } catch (error) {
        let message = err.statusText || "Ocurrio un error";
        $table.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}:${message}</b></p>`);
    }
}
d.addEventListener("DOMContentLoaded", getAll)
/**
 * Funcion encargada de crear y editar  en los santo de la api falsa.
 */
d.addEventListener("submit", async e => {
    if (e.target === $form) {
        e.preventDefault();

        if (!e.target.id.value) {
            //Create-POST
            try {
                let options = {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json;charset = utf-8"
                    },
                    data: JSON.stringify({
                        nombre: e.target.nombre.value,
                        constelacion: e.target.constelacion.value
                    })
                }
                let res = await axios("http://localhost:5555/santos", options),
                    json = await res.data
                location.reload();
            } catch (err) {
                let message = err.statusText || "Ocurrio un error";
                $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}:${message}</b></p>`);
            }
        } else {
            //UpdatePUT
            try {
                let options = {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json;charset = utf-8"
                    },
                    data: JSON.stringify({
                        nombre: e.target.nombre.value,
                        constelacion: e.target.constelacion.value
                    })
                },
                    res = await axios(`http://localhost:5555/santos/${e.target.id.value}`, options),
                    json = await res.data

                location.reload();
            } catch (err) {
                let message = err.statusText || "Ocurrio un error";
                $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}:${message}</b></p>`);
            }
        }
    }
})

/**
* Funcion editar y eliminar los datos de la base de datos de los santos.
*/
d.addEventListener("click", async e => {
    if (e.target.matches(".edit")) {
        $title.textContent = "Editar Santo";
        $form.nombre.value = e.target.dataset.name;
        $form.constelacion.value = e.target.dataset.constellation;
        $form.id.value = e.target.dataset.id;
    }
    if (e.target.matches(".delete")) {
        console.log($template.querySelector(".name").textContent)
        let isDelete = confirm(`¿estas seguro de eliminar el santo ${$template.querySelector(".name").textContent}?`);
        if (isDelete) {
            try {
                let options = {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json;charset = utf-8"
                    },
                },
                    res = await axios(`http://localhost:5555/santos/${e.target.dataset.id}`, options),
                    json = await res.data
                location.reload();
            } catch (err) {
                let message = xhr.statusText || "Ocurrio un error";
                alert(`Error ${err.status}:${message}`);
            }
        }
    }
})