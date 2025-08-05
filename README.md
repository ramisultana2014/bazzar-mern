# protected routes

1-in useLogin and useAccountActivate we use loggedInUserInfo from redux to save user info into redux
2- in ProtectedRoutes.tsx: at first we read user info from the cache and also user from redux
3- we check if there is no userInRedux || !userInRedux.\_id

<Route
element={
<ProtectedRoutes>
<AppLayOut />
</ProtectedRoutes>
}

# props in styled components

in AppLayOut.tsx
1- <Wrapper isdarktheme={isDarkTheme ? "true" : ""}>
2- const Wrapper = styled.section<{ isdarktheme: string }>`
3- background-color: ${(props) =>
props.isdarktheme === "true"
? "var(--color-grey-800)"
: "var(--color-grey-50)"};
}

# aside

<aside>
<div nav-links>
many NavLink each with class nav-link
</div>

</aside>
- aside have auto width
- nav-links width 5rem when hover over it become 15rem, i gave it fixed height so just within this height the hover effect work
- each text in NavLink opacity is 0 , when hover nav-links it become 1

# darkTheme

- for first render
  in App.tsx we read what in localStorage by checkDefaultTheme inside useEffect and put the result in redux by storeDarkThemeInRedux , then we read redux (isDarkTheme) in Profile.tsx to set the cover image and profile picture depend on the theme (dark or white) all that at first render ,
- for interactivity : in AppLayOut we use toggleDarkTheme.
  inside toggleDarkTheme we use storeDarkThemeInRedux to put the result in redux , so when user toggle theme we can read the result immediately in any component like in Profile.tsx where we toggle the default cover image and profile picture(just the default one)
- also we can use storeDarkThemeInRedux in other page to set different style(in AppLayOut.tsx) depends on the theme

# Profile

in Profile.tsx we upload profile and cover picture and delete them
when upload image best to use formData

- also we display products belong to user

# Menus for cover and profile image

Menus.ToggleForImageMenuList is button i put inside it the cover image or profile image as children so when we click on it we open the Menus.List,
in ToggleForImageMenuList will gave the position for the Menus.List(ul)

- also the image style in StyledToggleForImageCoverMenuList and in StyledToggleForImageProfileMenuList

- in most situation it will be just Menus.Toggle without children
- inside Menus.List we put many Modal.open each when click on it will open the related Modal.Window
- the style for Modal.Open children is in Menus.List
- Menus
  Modal
  Menus.ToggleForImageMenuList inside it image
  Menus.List inside it many Modal.Open
  Modal.Window will put the logic
  each image need to have Menus.ToggleForImageMenuList, Menus.List,Modal.Open,Modal.Window
  just Menus wrap everything , the rest need to be repeated to each image

# Menus & modal in ProductCard.tsx (inside Profile.tsx)

in Profile.tsx Menus already wrap everything , so in ProductCard:
Menus - this one in Profile.tsx
<Modal/>
<Menus.Menu>
<Menus.Toggle id={product.\_id} />
<Menus.List >inside it many Modal.Open</Menus.List>
<Modal.Window> will put the logic</Modal.Window>
</Menus.Menu>
</Modal>
Menus

# Pagination & search

- ✅ URLSearchParams: getHubProductsApi

is a built-in web API in JavaScript that provides a convenient way to work with the query string of a URL. The query string is the part of the URL that comes after the question mark (?) and consists of key-value pairs

use it in: getHubProductsApi -> useGetHubProducts -> HomePage.tsx -> PaginationAndSort
✅ adding search to query in search bar is in Header.tsx using debounce

in server:

- validateQuery folder middleware
- in hubProducts in userController

# adding product to cart

> orderSlice.ts
> in ProductCard.tsx we just add the product to cart array in order object
> Cart.tsx table where we display what user add to cart and let him(if he want) modify the quantity then inside handleCreateOrder add whole order into redux and create order into server ,

# models

- now each single product i can bring all sales for it
- each user can bring all his product sales
- each order can bring all related product in his cart

# createOrder in userController

> 1- const session = await mongoose.startSession();

- This creates a "session object".
- The session is like a container that will track multiple database operations
- All operations inside me must succeed together or none at all.”

> 2- session.startTransaction();

- “Hey, I’m starting a transaction. Don’t permanently apply any of the operations yet — wait until I tell you I’m done.”

> 3- Why do I need to pass { session }or .session(session) to every .find(), .save(), .create() delete ,Because without this, MongoDB won’t associate the operation with your transaction! its like Ensures all operations are tracked under the same transaction.

await OrderModel.create([req.body.order], { session });
✅ This is correct — you're inserting one document, but inside an array to work with the transaction API.

> abortTransaction():Automatically rolls back everything if an error is thrown.

- imagine this scenario:
  A -customer adds products A and B to the cart.
  The server creates the order and updates quantity of A, but...` Before saving product B or the order, the server crashes.
-result?` Product A quantity is reduced (incorrectly).
  But no order exists in the DB.` 🧠Transactions solve this: all DB operations are treated as one unit — if any step fails, all changes are rolled back automatically. No corruption.

B-Two users try to buy the last item at the same time.
Your frontend says “yes, quantity is available” to both.
Without a transaction, both might reduce quantity below zero, or both orders might be accepted.

🧠 Only a transaction prevents that, because it locks the product during update:
product.quantity -= item.productQuantityInCart;
await product.save({ session });
That ensures no one else can mess with that product during this session.

# lean()

return the raw document without save() ,isModified() ... , its really fast and good for comparison , it just return the document without the ability to modify it

# cart.\*

This path cart.\* targets an array named cart . The \* then indicates that the validation or sanitization rules should be applied to each individual element within the cart array.

# stripe

Cart.tsx after success in react query (createOrder) we navigate to CheckOut.tsx where we read the param orderId(orderId coming from server response) and send post request to our server `/create-checkout-session/:orderId"` here we create session with stripe and return embedded document form(stripe) to the front end ,now after success payment the user been redirected to Return.tsx by the url `${origin}/return?session_id={CHECKOUT_SESSION_ID}&orderId=${orderId}`

- in return Page we communicate again with our server route `/session-status` where we check if session.status === "complete" and modify paymentStatus to paid in order and as explained in payment logic below

# payment Logic

-first we gave each product that user add to cart in productCard.tsx the userId

- in ProductInOrderModel each document have the userId whom buy it and default paymentStatus= pending

> now the data flow:

- in createOrder in server each time this user try to create new order we delete all orders that have his id and have paymentStatus: "pending", and also we go to ProductInOrderModel and delete all document that he buy it and have paymentStatus: "pending",( i should name the userId in Order also buyerId)
- we create order document in OrderModel and pass the orderId to all the product in cart to create ProductInOrderModel documents
- the product quantity we changed in sessionStatus after we assure that the stripe has completed successfully also we change the order paymentStatus to paid and also each document in ProductInOrderModel that belong to the order
  paymentStatus to paid

# stats

in userController :

we use $project to:
Include/exclude fields
Create new field names (i.e., rename fields)
Perform inline transformations
