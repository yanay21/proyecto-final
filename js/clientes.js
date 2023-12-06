const { createApp } = Vue
    createApp({
        data() {
            return {
                clientes:[],
                url:"http://yanay23.pythonanywhere.com/clientes",
               
                error:false,
                cargando:true,
                /*atributos para el guardar los valores del formulario */
                id:0,
                nombre:"",
                genero:"",
                plan:"",
                edad:0,
                hijos:0,
            }
        },
        methods: {
            fetchData(url) {             
                fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.clientes = data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true
                })
            },
            eliminar(cliente) {
                const url = this.url+'/' + cliente;
                var options = {
                    method: 'DELETE',
                }
                fetch(url, options)
                    .then(res => res.text()) // or res.json()
                    .then(res => {
                        location.reload();
                    })
            },
            grabar(){
                let cliente = {
                    nombre:this.nombre,
                    edad: this.edad,
                    genero: this.genero,
                    hijos:this.hijos,
                    plan:this.plan
                }
                var options = {
                    body:JSON.stringify(cliente),
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    redirect: 'follow'
                }
                fetch(this.url, options)
                    .then(function () {
                        alert("Registro grabado")
                        window.location.href = "./clientes.html";
                    })
                    .catch(err => {
                        console.error(err);
                        alert("Error al Grabarr")
                    })
            }
        },
        created() {
            this.fetchData(this.url)
        },
    }).mount('#app')