(function () {
    // START: CODE
    /*                    Get Viewport Height                         */
    vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    //set :root variable to css
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    /*                    Uncheck all checkboxes                         */
    window.onload = () => {
        window.addEventListener('load', uncheckAll, false);
    }

    /*                               Loader                                  */
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            loader1.classList.add('hide');
        }, 1000)
    });

    /*                             Variables                                  */
    const open = document.querySelector('.openbtn'),
        close = document.querySelector('.closebtn'),
        main = document.querySelector('.main'),
        results = document.querySelector('.results'),
        headerContainer = document.querySelector('.header-container');
    h1 = document.querySelector('.header-container h1'),
        ul = document.querySelector('nav ul'),
        loader1 = document.querySelector('.loader1'),
        loader2 = document.querySelector('.loader2'),
        http = new XMLHttpRequest();

    let items = JSON.parse(sessionStorage.getItem(h1.innerHTML)) || [];

    /* -----HTTP GET request and Page Content depending on what is clicked----*/
    //1st step => eventlistener on nav ul that decides if "new http request" or "sessionStorage retrieve"
    //2nd step => Then either http request and then populateList function
    //3rd step => Or only populateList function if sessionStorage !== empty
    function httpRequest(method, url, title) {
        //List loader is on
        loader2.classList.add('show');

        http.open(method, url);
        http.send();
        http.onload = () => {
            const con = JSON.parse(http.responseText);
            const item = con.map(c => {
                let res = {
                    code: c.code || '',
                    name: c.name || '',
                    address: c.address || '',
                    description: c.description || '',
                    done: false
                }
                return res;
            })

            items = item;

            populateList(items, results, title);
            sessionStorage.setItem(title, JSON.stringify(items));
        }
    }

    function populateList(items = [], results, title) {
        //Uncheck all checkboxes
        uncheckAll();

        const hr = `<hr class="hr"/>`;

        setTimeout(() => {
            //Remove existing button
            deleteButton();
            //Get heading content
            h1.innerHTML = title;
            //List loader is off
            loader2.classList.remove('show');

            //Get main content
            if (items[0].address !== '') {
                (function () {
                    return results.innerHTML = `
                        <ul style="grid-template-columns: 40% 20% 40%";>
                            <li tabindex="1" style="grid-area:1/1/2/2; font-weight:bold;">CODE</li>
                            <li tabindex="1" style="grid-area:1/2/2/3; font-weight:bold;">NAME</li>
                            <li tabindex="1" style="grid-area:1/3/2/4; font-weight:bold;">ADDRESS</li>
                        </ul>
                        ${hr}
                        ${items.map((item, i) => {
                            return `
                                <ul style="grid-template-columns: 40% 20% 40%";>
                                    <li tabindex="1" style="grid-area:${i+2}/1/${i+3}/2;">${item.code}</li>
                                    <li tabindex="1" style="grid-area:${i+2}/2/${i+3}/3;">${item.name}</li>
                                    <li tabindex="1" style="grid-area:${i+2}/3/${i+3}/4;">${item.address}</li>
                                </ul> 
                                ${hr}   
                            `
                        }).join('')}
                    `
                }());
            } else if (items[0].description !== '') {
                createButton();
                (function () {
                    return results.innerHTML = `
                        <ul style="grid-template-columns: 50% 50%;">
                            <li tabindex="1" style="grid-area:1/1/2/2; font-weight:bold;">CODE</li>
                            <li tabindex="1" style="grid-area:1/2/2/3; font-weight:bold">DESCRIPTION</li>
                        </ul>
                        ${hr}
                        ${items.map((item, i) => {
                            return ` 
                                <ul class="ul${i}" style="grid-template-columns: 50% 50%;">
                                    <li tabindex="1" style="grid-area:${i+2}/1/${i+3}/2;">
                                        <input type="checkbox" data-index=${i} id="item${i}" ${item.done ? 'checked' : ''}/>
                                        <label for="item${i}">${item.code}</label>
                                    </li>
                                    <li tabindex="1" style="grid-area:${i+2}/2/${i+3}/3;">${item.description}</li>
                                </ul>
                                ${hr}
                            `
                        }).join('')}
                    `
                }());
            } else {
                createButton();
                (function () {
                    return results.innerHTML = `
                        <ul style="grid-template-columns: 30% 70%;">
                            <li tabindex="1" style="grid-area:1/1/2/2; font-weight:bold;">NAME</li>
                            <li tabindex="1" style="grid-area:1/2/2/3; font-weight:bold;">CODE</li>
                        </ul>
                        ${hr}
                        ${items.map((item, i) => {
                            return `
                                <ul style="grid-template-columns: 30% 70%;">
                                    <li tabindex="1" style="grid-area:${i+2}/1/${i+3}/2; width: 130px;">${item.name}</li>
                                    <li tabindex="1" style="grid-area:${i+2}/2/${i+3}/3; width: 130px;">${item.code}</li>
                                </ul>  
                                ${hr}  
                            `
                        }).join('')}
                    `
                }());
            }
        }, 2000);
    }
    /* -----HTTP GET requests and Page Content depending on what is clicked----*/


    /* --------------------- Products page functions --------------------------*/
    /*                         Check Checkboxes                              */
    function toggleCheck(e) {
        //return if the click target is not an input
        if (!e.target.matches('input[type=checkbox]')) return;

        const el = e.target;
        const index = el.dataset.index;
        //Toggle done between true and false (if done===true => :checked)
        items[index].done = !items[index].done;
        //Give background color to checked elements
        items[index].done ? el.closest('ul').classList.add('checkedBg') : el.closest('ul').classList.remove('checkedBg');
        sessionStorage.setItem('Products', JSON.stringify(items));
    }

    /*                           Remove Product                               */
    function removeItem(e) {
        //Empty array that will accept all checked products
        let howManyChecked = [];
        const checked = document.querySelectorAll('input[type=checkbox]');
        //Push the checked checkboxes into the howManyChecked array
        checked.forEach(check => {
            howManyChecked.push(check.checked);
        });
        //Get sum of checked/unchecked checkboxes
        const sumChecked = howManyChecked.reduce((obj, item) => {
            if (!obj[item]) {
                obj[item] = 0;
            }
            obj[item]++;
            return obj;
        }, {});
        //Delete the unchecked
        delete sumChecked.false;
        //Get the number of checked checkboxes
        let num = Object.values(sumChecked);
        //Output message according to number of checked checkboxes
        if (num[0] == 1) {
            const conf = confirm('Are you sure you want to delete this product?');
            let deletedIndex;
            //If only one checkbox is checked and the user confirms, this item is deleted
            if (conf) {
                items.map((item, i) => {
                    if (item.done === true) {
                        return deletedIndex = i;
                    }
                });
                items.splice(deletedIndex, 1);
                sessionStorage.setItem('Products', JSON.stringify(items));
                populateList(items, results, 'Products');
            }
            //If more than one checkboxes are checked
        } else if (num[0] > 1) {
            alert('Please choose only one product');
            //If no checkbox is checked
        } else if (num[0] < 1 || num[0] == undefined) {
            alert('Please choose one product');
        }
        //Reset checked checkboxes list
        howManyChecked = [];
    }
    /* --------------------- Products page functions --------------------------*/


    /* ------------------------ User page functions -----------------------------*/
    /*                                Add User                                   */
    function addUser(e) {
        const button = document.createElement('button');
        const text = document.createTextNode('Create');
        let name, code, user = {};
        //Remove existing button and create new one of the right type
        deleteButton();
        button.appendChild(text);
        //Insert button as last item
        headerContainer.parentNode.insertBefore(button, headerContainer.nextSibling);
        //Get heading text
        h1.innerHTML = `
            <div class="add_new">
                <span class="arrow">&larr;</span>
                <h1>Add New</h1>
            </div>
            `;

        //Check if all inputs contain text or not
        function checkBlanks() {
            name = document.querySelector('#name').value,
                code = document.querySelector('#code').value;
            //And alert the right message
            if (name === '' && code === '') {
                alert('All fields are required');
            } else if (name === '') {
                alert('Name is required');
            } else if (code === '') {
                alert('Code is required');
            } else {
                createUser();
            }
        }
        //Create New User function
        function createUser() {
            user.name = name;
            user.code = code;
            user.address = '',
                user.description = '',
                user.done = false;
            //Add created item first in item's list
            items.unshift(user);
            //Show list loader
            loader2.classList.add('show');
            //Save new content to sessionStorage
            sessionStorage.setItem('Users', JSON.stringify(items));
            goBack();
        }
        //"Arrow" function that returns from "add-new-user" to "Users"
        function goBack() {
            loader2.classList.add('show');
            populateList(items, results, 'Users');
        }
        //Add event listeners to newly created elements
        document.querySelector('.arrow').addEventListener('click', goBack);
        button.addEventListener('click', checkBlanks);
        //Get main content
        return results.innerHTML = `
            <form class="addUser">
                <label for="name">Name: <sup style="color: red; font-size: 8px;">*</sup></label> 
                <input type="text" class="addUserInput" name="name" id="name" required><br>
                <label for="code">Code: <sup style="color: red; font-size: 8px;">*</sup></label>  
                <input type="text" class="addUserInput" name="code" id="code"required>
            </form>
        `
    }
    /* ------------------------ User page functions -----------------------------*/


    /* ----------------------- Supporting Functions ------------------------------*/
    /*                       Open navigation upon click                           */
    function openNav() {
        document.querySelector(".nav").style.width = "200px";
        main.classList.add('blur');
        const buttons = document.querySelectorAll('button');
        buttons.forEach((btn) => {
            btn.disabled = true;
            btn.classList.add('btnBlur');
        });
    }

    /*                   Close navigation upon click -- didn't use it           */
    function closeNav() {
        const nav = document.querySelector(".nav");
            nav.style.width = '0';
            main.classList.remove('blur');
            const buttons = document.querySelectorAll('button');
            buttons.forEach((btn) => {
                btn.disabled = false;
                btn.classList.remove('btnBlur');
            });
    }

    /*                     Create - Delete & Add-New - Buttons                     */
    function createButton() {
        const button = document.createElement('button');
        const text = document.createTextNode(btnName());
        button.appendChild(text);
        button.setAttribute('class', button.innerText.slice(0, 3));
        //Insert button as last item
        headerContainer.parentNode.insertBefore(button, headerContainer.nextSibling);
        //Get heading text
        function btnName() {
            return h1.innerText === 'Products' ? 'Delete' : 'Add New';
        }
        //Add listeners to created buttons
        if (button.classList.contains('Del')) {
            button.addEventListener('click', removeItem);
        } else if (button.classList.contains('Add')) {
            button.addEventListener('click', addUser);
        }
    }

    function deleteButton(e) {
        let but = document.querySelector('button');
        if (headerContainer.nextSibling.tagName === 'BUTTON') {
            but.remove();
        }
    }

    /*                    Uncheck all checkboxes                         */
    function uncheckAll() {
        const inputs = document.querySelectorAll('input[type="checkbox"]');
        setTimeout(() => {
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].checked = false;
            }
        }, 3000);

        items.map(item => {
            item.done = false;
        });
    }
    /* ----------------------- Supporting Functions ------------------------------*/


    /* ----------------------------- Listeners ----------------------------------*/
    //Basic listener that leads to new http request or fetch data from sessionStorage
    ul.addEventListener('click', (e) => {
        //Uncheck all checkboxes
        uncheckAll();

        //Generate content according to classes of clicked elements
        //If sessionStorage empty => new http request else get info from sessionStorage
        if (e.target.classList.contains('logo')) {
            //Remove existing button
            deleteButton();
            h1.innerHTML = 'Welcome';
            main.innerHTML = '';
        } else if (e.target.classList.contains('customers')) {
            if (!sessionStorage.getItem('Customers')) {
                httpRequest('GET', 'http://www.json-generator.com/api/json/get/clGirwieiG?indent=2', 'Customers');
            } else {
                loader2.classList.add('show');
                items = JSON.parse(sessionStorage.getItem('Customers'));
                populateList(items, results, 'Customers');
            }
        } else if (e.target.classList.contains('products')) {
            if (!sessionStorage.getItem('Products')) {
                httpRequest('GET', 'http://www.json-generator.com/api/json/get/cfuYARGbZu?indent=2', 'Products');
            } else {
                loader2.classList.add('show');
                items = JSON.parse(sessionStorage.getItem('Products'));
                populateList(items, results, 'Products');
            }
        } else if (e.target.classList.contains('users')) {
            if (!sessionStorage.getItem('Users')) {
                httpRequest('GET', 'http://www.json-generator.com/api/json/get/bUKoqVniOG?indent=2', 'Users');
            } else {
                loader2.classList.add('show');
                items = JSON.parse(sessionStorage.getItem('Users'));
                populateList(items, results, 'Users');
            }
        }
    });

    open.addEventListener('click', openNav);
    close.addEventListener('click', closeNav);
    results.addEventListener('click', toggleCheck);
    /* ----------------------------- Listeners ----------------------------------*/

    populateList(items, results, h1.innerHTML);
    // END: CODE
}());
