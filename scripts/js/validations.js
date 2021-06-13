//Guardamos cada formulario en constantes
const formLogin = document.getElementById("loginFormId"); //Formulario de login


/*//////////////////////////// Validaciones mediante regex ////////////////////////////*/
//E-MAIL
function validar_email(email) {
	//Declaramos nuestra expresión regular
	var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	//Comprobamos si el parámetro cumple con la expresión regular. El método .test() retorna true si existe una coincidencia entre la expresión regular y la cadena especificada; de lo contrario retorna false.
	return regex.test(email) ? true : false;
	//El símbolo ? es el ternary operator. Funciona así: condition ? value if true : value if false
	/* Por ejemplo:
	let age = 60 
    let result = (age > 59)? 
        "Senior Citizen":"Not a Senior Citizen"; 
  
    document.write(result);

	Output: Senior Citizen
	*/
}



/*//////////////////////////// Función de validación de login ////////////////////////////*/
function loginValidate(){

    //Contador de errores
    let acumErrores = 0;

    //Eliminamos todos los posibles is-invalid que aparezcan en la lista de clases de cada elemento del formulario
    formLogin.classList.remove("is-invalid");

    //Guardamos los inputs en variables
    //document.forms hace una lista de todos los elementos form que existen en nuestro HTML. Con ["loginForm"] accedemos al <form> que tenga como NAME loginForm (seria lo mismo que document.forms.loginForm). Luego buscamos el elemento que tenga como nombre ["inputEmail"]. Todo esto lo guardamos en la variable inputEmail, por lo tanto ahora tenemos el input (donde escribiremos el e-mail) guardado en una variable.>
    let inputEmail = document.forms["loginForm"]["loginInputEmail"];
    let inputPassword = document.forms["loginForm"]["loginInputPassword"];

    /* Validamos email */
    //Si el valor de inputEmail es vacío
    if (inputEmail.value == "") {
        //Añadiremos a la lista de clases del elemento la clase is-invalid
        inputEmail.classList.add("is-invalid");
        //Añadiremos al div el texto mediante text.Content (propiedad de Node)
        document.getElementById("errorLoginEmail").textContent = "El campo es obligatorio";
        //Sumamos 1 al contador 
        acumErrores ++; 
    }
    //Si hay escrito algo, llamamos a la función validar_email pasándole como parámetro el valor de inputEmail. Si nos retorna false se ejecutarán las lineas de código
    else if (!validar_email(inputEmail.value)) {
        //Añadiremos a la lista de clases del elemento la clase is-invalid
        inputEmail.classList.add("is-invalid");
        //Añadiremos al div el texto mediante text.Content (propiedad de Node)
        document.getElementById("errorLoginEmail").textContent = "El email no cumple el formato";
        //Sumamos 1 al contador 
        acumErrores ++;
    }




    //En el momento en que se detecte un error, devolverá false y eso impedirá enviar los datos que se han escrito, ya que hay almenos un campo con información que no cumple la validación
    if (acumErrores > 0){
        return false;
    }else{
		return true;
	}
}




//Función que nos sacará la clase is-invalid cuando hagamos blur y detecte que hayamos borrado el texto que había en el campo
//Accedemos a la etiqueta form y vamos a añadirle un evento del tipo blur (evento que inicia cuando, habiendo seleccionado un input, lo deseleccionamos)
//El segundo parámetro es una función cuyo parámetro será el evento en sí que se ha desencadenado
formLogin.addEventListener('blur', (event) => {
	console.log(event); //Sacamos por consola el evento
	//event.target es una referencia al objeto que ha lanzado el evento
	//Si (el objeto que ha experimentado el evento está vacío), entonces quitaremos de la classList del objeto que ha experimentado el evento (la clase is-invalid). Por tanto, dejará de salir en rojo
	if(event.target.value!='') {
		event.target.classList.remove('is-invalid');
	} 
	//Opcionalmente volveríamos a llamar a la función que llama el botón de submit 
    //registerValidate();
}, true);
//True en el tercer parámetro significa que se ejecutará el evento en fase capture.
/* With bubbling, the event is first captured and handled by the innermost element and then propagated to outer elements.

With capturing, the event is first captured by the outermost element and propagated to the inner elements. */