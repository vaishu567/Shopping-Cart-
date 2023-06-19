( ()=>{

    // creating an object to store available items data:
    const menuData ={
        // sku - stock keeping unit as the key and the detals are the values:
        "123923080":{
            productName:"HeadPhones",
            price: 2090

        },
        "794880903":{
            productName:"Jammer",
            price:1500
        },
        "623478027":{
            productName:"Laptop",
            price:90000
        },
        "813880301":{
            productName:"Mouse",
            price:700
        },
        "4123758986":{
            productName:"Keyboard",
            price:8900
        }

    };


    const cartData={};
    const totalA= document.querySelector(".total-amount")

// div>span,(span>button):
    const setMenu= function setMenu(){
        for (var sku in menuData){
            var menuItem= createMenuItem(sku);

            document.querySelector(".menu-area").appendChild(menuItem);

        }

    };

    const createMenuItem= function createMenuItem(sku){
        var data = menuData[sku];

        const element1= document.createElement("div");
        element1.classList.add("menu-item");

        const element2=document.createElement("span");
        element2.classList.add("menu-text");
        element2.innerText=data.productName + "-" + " ₹ "+ data.price;

        const element3=document.createElement("span");
        element3.classList.add("menu-action")

        const element4=document.createElement("button");
        element4.innerHTML="+";
        element4.setAttribute("data-sku",sku);
        element4.addEventListener("click",addToCart)

        element1.appendChild(element2);
        element1.appendChild(element3);
        element3.appendChild(element4);

        return element1;
    }
    const addToCart= function addToCart (event){
        const buttonel= event.target;
        console.log(buttonel)
        const skuel=buttonel.getAttribute("data-sku");
        if (skuel in cartData){
            cartData[skuel]+=1;
        }else cartData[skuel]=1;
        console.log(cartData)
        setCart();
    }

    const cartList=document.querySelector('.cart-list');

    const setCart= function setCart(){
        cartList.innerHTML=" ";
        // cart list it had some children when we update the cart before adding the new child we delete the exsisting child 
        // we create new div new nodes by deleteing old ones for small websites it will be not that problem but for bigger 
        // websites like facebook messenger we have thousands of messages imagine deleting thousands of childs and adding new.
        // it will be very inefficient we can see the screen flickering for huge websites/apps.so how do we surpass this problem?
        // first soln: we have to write lot more code using vanilla javascript and 2nd: using tools like react, angular ,etc.

        var total=0
        for(const sku in cartData){

            const pri= menuData[sku].price
            const quan= cartData[sku];

            const setItem= createCartItem(sku)
            total+=(pri*quan)

            cartList.appendChild(setItem)
        } 
        totalA.innerText=total;
    }

    const createCartItem = function(sku){

        const data = menuData[sku];
        const qun= cartData[sku];
        const el1=document.createElement('div');
        el1.classList.add("cart-item");

        const el2=document.createElement('span');
        el2.classList.add("item-text");
        el2.innerText=data.productName + " x " + qun;

        const el3= document.createElement('span');
        el3.classList.add("item-total");
        el3.innerText="₹"+data.price*qun;

        const bunel=document.createElement("button");
        bunel.classList.add("remove-butn");
        bunel.innerText="-";
        bunel.setAttribute("data-sku",sku);
        bunel.addEventListener("click",removeFromCart)

        el1.appendChild(el2);
        el1.appendChild(el3);
        el1.appendChild(bunel);


        return el1

    }


    const removeFromCart=function removeFromCart(event){
        const remover= event.target;
        const sku = remover.getAttribute("data-sku");
        if (sku in cartData){
            cartData[sku]-=1;

            if (cartData[sku]<1) {
                delete cartData[sku]
            }
        setCart();
        }
    };
    setMenu();

})();


// adding new dom elemnts on the screen or changing the screen it conusmes cpu, ram , battery life andd slow downs persons device. 
// so we should try to reduce dom operations for better performance.


// difficulty we faced:
// 1.a lot of code
// 2.we have to keep the data and ui in sync(when cart changes we change variable and dom aswell)
// 3.hard to write efficient code.
// 4.small chnages in structure can break our application.
// 5.time to bulid this kind of several elements will be lot.

// pros:
// 1.u dont have to send any library or framework to the end user as a js file.
// 2.initial page load is very fast with vanillla js.
// 3.and also very useful for information sites where there is not much user interaction like wikipedia.
// we dont have notification area, chat box ,comment box so u dont have to change lot of data and ui.(userinteration lesss)
