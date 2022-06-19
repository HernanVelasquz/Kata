const dom = document,
    $table = dom.querySelector('.crud-table'),
    $form = dom.querySelector('.crud-form'),
    $title = dom.querySelector('.crud-title'),
    $templeate = dom.getElementById('crud-template'),
    $fragment = dom.createDocumentFragment();

const getAll = async () =>{
    try {
        let res = await axios.get("http://localhost:5555/santos");
        let json = await res.data;
        console.log(json);
    } catch (err) {
        let message = err.statusText || 'Ocurrió un error';
        $table.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`)
    }
}

dom.addEventListener("DOMContentLoaded", getAll)