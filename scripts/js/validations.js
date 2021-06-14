//Guardamos cada formulario en constantes
const formLogin = document.getElementById("loginFormId"); //Formulario de login
const formRegistro = document.getElementById("registroFormId"); //Formulario de registro
const formSearch = document.getElementById("searchFormId"); //Formulario de búsqueda


/*//////////////////////////// Validaciones mediante regex ////////////////////////////*/
//E-mail: Els camps email i contrasenya hauran de ser obligatoris. L'Email haurà de seguir el format estàndard dels email
function validarEmail (email) {
	//Declaramos nuestra expresión regular
	let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    //Otra posible regex (acepta si no pones .com por ejemplo): /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,4})*$/

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

//Contraseña: Els camps email i contrasenya hauran de ser obligatoris. Mínim una majúscula, mínim un número, mínim 8 caràcters
function validarPassword (password) {
    //Expresión regular
    /* Mínim una majúscula
    Mínim un número
    Mínim 8 caràcters */
    let regex = /^((?=.*\d)(?=.*[A-Z]).{8,})$/;
    /* 
    (?=.*\d) --> debe contener almenos un dígito de 0 a 9
    (?=.*[A-Z]) --> debe contener almenos un caracter en mayúscula
    . --> hará match a cualquier cosa que cumpla las condiciones anteriores
    {8,} --> debe contener almenos 8 caracteres
    */
   return regex.test(password) ? true : false;
}

//Nombre
function validarNombre (nombre) {
    let regex = /^[a-zA-Zà-ÿÑñÀ-ÿ\s]{1,40}$/; //La expresión \s es para espacios en blanco, por si quieren poner segundo nombre (José María)
    return regex.test(nombre) ? true : false;
}

//Apellido
function validarApellido (apellido) {
    let regex = /^[a-zA-Zà-ÿÑñÀ-ÿ]{1,40}$/
    return regex.test(apellido) ? true : false;
}

//Fecha de nacimiento
function fechaNacimiento (fecha) {
    let regex = /^([12][90]\d{2})[-](0[1-9]|1[0-2])[-](0[1-9]|[1-2]\d|3[01])$/;
    // let regex = /^(0[1-9]|[1-2]\d|3[01])[/](0[1-9]|1[0-2])[/]([12][90]\d{2})$/; El formato date es YYYY-MM-DD
    //0[1-9]|[1-2]\d|3[01] --> Día. Puede ser un día que empiece por 0 OR por 1 o 2 OR por 3.
    //0[1-9]|1[0-2] --> Mes. Puede ser un mes que empieze por 0 OR un mes que empiece por 1.
    //[12][90]\d{2} --> Año. Puede empezar por 1 o 2, puede seguir por 9 o 0, y luego dos dígitos más. Controlamos que 1800 no sea válido, por ejemplo.
    return regex.test(fecha) ? true : false;
}

//Búsqueda: La paraula introduïda haurà de ser obligatòria i contenir més de 3 caràcters.
function searchWord (busqueda) {
    let regex = /^[\d\wà-ÿÑñÀ-ÿ\s\.\-]{4,}$/;
    return regex.test(busqueda) ? true : false;
}




/*//////////////////////////// Función de validación de login ////////////////////////////*/
function loginValidate(){

    //Contador de errores
    let acumErrores = 0;

    //Eliminamos todos los posibles is-invalid que aparezcan en la lista de clases de cada elemento del formulario
    formLogin.classList.remove("is-invalid");
    formLogin.classList.remove("is-valid");

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
    else if (!validarEmail(inputEmail.value)) {
        //Añadiremos a la lista de clases del elemento la clase is-invalid
        inputEmail.classList.add("is-invalid");
        //Añadiremos al div el texto mediante text.Content (propiedad de Node)
        document.getElementById("errorLoginEmail").textContent = "El email no cumple el formato";
        //Sumamos 1 al contador 
        acumErrores ++;
    }
    else {
        inputEmail.classList.add("is-valid");
    }


    /* Validamos contraseña */
    if (inputPassword.value == "") {
        inputPassword.classList.add("is-invalid");
        document.getElementById("errorLoginPassword").textContent = "El campo es obligatorio";
        acumErrores ++;
    }
    else if (!validarPassword (inputPassword.value)) {
        inputPassword.classList.add("is-invalid");
        document.getElementById("errorLoginPassword").textContent = "La contraseña debe tener mínimo 8 caracteres, de los cuales mínimo una mayúscula y un dígito";
        acumErrores ++;
    }
    else {
        inputPassword.classList.add("is-valid");
    }


    //En el momento en que se detecte un error, devolverá false y eso impedirá enviar los datos que se han escrito, ya que hay almenos un campo con información que no cumple la validación
    if (acumErrores > 0){
        return false;
    }else{
		return true;
	}
}




/*//////////////////////////// Función de validación de registro ////////////////////////////*/
function registroValidate() {
    //Contador de errores
    let acumErrores = 0;

    //Eliminamos todos los posibles is-invalid que aparezcan en la lista de clases de cada elemento del formulario
    formRegistro.classList.remove("is-invalid");
    formRegistro.classList.remove("is-valid");

    //Guardamos los inputs en variables
    let inputNombre = document.forms["registroForm"]["registroInputNombre"];
    let inputApellido1 = document.forms["registroForm"]["registroInputApellido1"];
    let inputApellido2 = document.forms["registroForm"]["registroInputApellido2"];
    let inputEmail = document.forms["registroForm"]["registroInputEmail"];
    let inputPassword = document.forms["registroForm"]["registroInputPassword"];
    let inputRePassword = document.forms["registroForm"]["registroInputRePassword"];
    let inputFecha = document.forms["registroForm"]["registroInputFecha"];
    let inputProvincia = document.forms["registroForm"]["registroInputProvincia"];
    let inputPrivacidad = document.forms["registroForm"]["privacidadCheck"];


    /* Validamos Nombre */
    if (inputNombre.value == "") {
        inputNombre.classList.add("is-invalid");
        document.getElementById("errorRegistroNombre").textContent = "El campo es obligatorio";
        acumErrores ++;
    }
    else if (!validarNombre (inputNombre.value)) {
        inputNombre.classList.add("is-invalid");
        document.getElementById("errorRegistroNombre").textContent = "El nombre no cumple el formato";
        acumErrores ++;
    }
    else {
        inputNombre.classList.add("is-valid");
    }


    /* Validamos Apellido 1 */
    if (inputApellido1.value == "") {
        inputApellido1.classList.add("is-invalid");
        document.getElementById("errorRegistroApellido1").textContent = "El campo es obligatorio";
        acumErrores ++;
    }
    else if (!validarApellido (inputApellido1.value)) {
        inputApellido1.classList.add("is-invalid");
        document.getElementById("errorRegistroApellido1").textContent = "El apellido no cumple el formato";
        acumErrores ++;
    }
    else {
        inputApellido1.classList.add("is-valid");
    }


    /* Validamos Apellido 2 */
    if (inputApellido2.value != "" && !validarApellido (inputApellido2.value)) {
        inputApellido2.classList.add("is-invalid");
        document.getElementById("errorRegistroApellido2").textContent = "El apellido no cumple el formato";
        acumErrores ++;
    }
    else if (inputApellido2.value != "" && validarApellido (inputApellido2.value)) {
        inputApellido2.classList.add("is-valid");
    }


    /* Validamos Email */
    if (inputEmail.value == "") {
        inputEmail.classList.add("is-invalid");
        document.getElementById("errorRegistroEmail").textContent = "El campo es obligatorio";
        acumErrores ++;
    }
    else if (!validarEmail (inputEmail.value)) {
        inputEmail.classList.add("is-invalid");
        document.getElementById("errorRegistroEmail").textContent = "El email no cumple el formato";
        acumErrores ++;
    }
    else {
        inputEmail.classList.add("is-valid");
    }


    /* Validamos Contraseña */
    if (inputPassword.value == "") {
        inputPassword.classList.add("is-invalid");
        document.getElementById("errorRegistroPassword").textContent = "El campo es obligatorio";
        acumErrores ++;
    }
    else if (!validarPassword (inputPassword.value)) {
        inputPassword.classList.add("is-invalid");
        document.getElementById("errorRegistroPassword").textContent = "La contraseña debe tener mínimo 8 caracteres, de los cuales mínimo una mayúscula y un dígito";
        acumErrores ++;
    }
    else {
        inputPassword.classList.add("is-valid");    
    }


    /* Validamos repetición contraseña */
    if (inputRePassword.value == "") {
        inputRePassword.classList.add("is-invalid");
        document.getElementById("errorRegistroRePassword").textContent = "El campo es obligatorio";
        acumErrores ++;
    }
    else if (inputRePassword.value != inputPassword.value) {
        inputRePassword.classList.add("is-invalid");
        document.getElementById("errorRegistroRePassword").textContent = "Los caracteres introducidos no coinciden con el campo contraseña";
        acumErrores ++;
    }
    else {
        inputRePassword.classList.add("is-valid"); 
    }


    /* Validamos fecha de nacimiento */
    if (inputFecha.value == "") {
        inputFecha.classList.add("is-invalid");
        document.getElementById("errorRegistroFecha").textContent = "El campo es obligatorio";
        acumErrores ++;
    }
    else if (!fechaNacimiento (inputFecha.value)) {
        inputFecha.classList.add("is-invalid");
        document.getElementById("errorRegistroFecha").textContent = "Fecha no válida";
        acumErrores ++;
    }
    else {
        inputFecha.classList.add("is-valid");
    }


    /* Validamos provincia */
    if (inputProvincia.value == "") {
        inputProvincia.classList.add("is-invalid");
        document.getElementById("errorRegistroProvincia").textContent = "El campo es obligatorio";
        acumErrores ++;
    }
    else {
        inputProvincia.classList.add("is-valid");
    }


    /* Validamos privacidad */
    //Si inputPrivacidad checked es false
    if (!inputPrivacidad.checked) {
        inputPrivacidad.classList.add("is-invalid");
        document.getElementById("errorPrivacidadCheck").textContent = "Acepta la política de privacidad";
        acumErrores ++;
    }


    if (acumErrores > 0){
        return false;
    }else{
		return true;
	}
}



/*//////////////////////////// Función de validación de búsqueda ////////////////////////////*/
function searchValidate(){
    //Contador de errores
    let acumErrores = 0;

    //Eliminamos todos los posibles is-invalid que aparezcan en la lista de clases de cada elemento del formulario
    formSearch.classList.remove("is-invalid");    

    //Guardamos los inputs en variables
    let inputSearch = document.forms["searchForm"]["inputSearch"];

    /* Validamos búsqueda */
    if (inputSearch.value == "") {
        inputSearch.classList.add("is-invalid");
        document.getElementById("errorSearch").textContent = "No se ha introducido ningún elemento a buscar";
        acumErrores ++;
    }
    else if (!searchWord (inputSearch.value)) {
        inputSearch.classList.add("is-invalid");
        document.getElementById("errorSearch").textContent = "La búsqueda debe contener más de 3 caracteres";
        acumErrores ++;
    }

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
        event.target.classList.remove('is-valid');
	} 
	//Opcionalmente volveríamos a llamar a la función que llama el botón de submit 
    //registerValidate();
}, true);
//True en el tercer parámetro significa que se ejecutará el evento en fase capture.
/* With bubbling, the event is first captured and handled by the innermost element and then propagated to outer elements.

With capturing, the event is first captured by the outermost element and propagated to the inner elements. */

//Hacemos lo mismo para el formulario de registro
formRegistro.addEventListener('blur', (event) => {
	console.log(event);
	if(event.target.value!='') {
		event.target.classList.remove('is-invalid');
        event.target.classList.remove('is-valid');
	} 	
}, true);

//Hacemos lo mismo para el formulario de búsqueda
formSearch.addEventListener('blur', (event) => {
	console.log(event);
	if(event.target.value!='') {
		event.target.classList.remove('is-invalid');
        event.target.classList.remove('is-valid');
	} 	
}, true);

/* Esto serviría para sacar el evento por defecto del botón submit por ejemplo
document.getElementById("loginButtonSubmit").addEventListener("click", function(event){
  event.preventDefault();
});  */