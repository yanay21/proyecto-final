console.log(location.search) // lee los argumentos pasados a este formulario
var id=location.search.substr(4)
console.log(id)
const { createApp } = Vue
    createApp({
        data() {
            return {
                id:0,
                nombre:"",
                genero:"",
                plan:"",
                edad:0,
                hijos:0,
                
                url:'https://yanay23.pythonanywhere.com/clientes'+id,
            }
        },
        methods: {
            fetchData(url) {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        this.id=data.id
                        this.nombre = data.nombre;
                        this.genero=data.genero
                        this.edad=data.edad
                        this.hijos=data.hijos
                        this.plan=data.plan
                    })
                    .catch(err => {
                        console.error(err);
                        this.error=true
                    })
            },
            modificar() {
                let cliente = {
                    nombre:this.nombre,
                    edad: this.edad,
                    genero: this.genero,
                    hijos:this.hijos,
                    plan:this.plan
                }
                var options = {
                    body: JSON.stringify(cliente),
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    redirect: 'follow'
                }
                fetch(this.url, options)
                    .then(function () {
                        alert("Registro modificado")
                        window.location.href = "./clientes.html";
                    })
                    .catch(err => {
                        console.error(err);
                        alert("Error al Modificar")
                    })
            }
        },
        created() {
            this.fetchData(this.url)
        },
    }).mount('#app')