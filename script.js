  let items = [];
        const TAX_RATE = 0.10;

        function addItem() {
            const name = document.getElementById('itemName').value.trim();
            const qty = parseInt(document.getElementById('quantity').value);
            const price = parseFloat(document.getElementById('price').value);
            const discount = parseFloat(document.getElementById('discount').value) || 0;

           
            if (!name ||!qty ||!price ||!discount|| qty <= 0 || price <= 0 || discount < 0 || discount > 100) {
                alert("Please enter All inputs.");
                return;
            }

            const totalBeforeDiscount = qty * price;
            const discountAmount = totalBeforeDiscount * (discount / 100);
            const total = totalBeforeDiscount - discountAmount;

            items.push({ name, qty, price, discount, totalBeforeDiscount, discountAmount, total });

            updateTable();
            clearInputs();
        }

        function updateTable() {
            const tbody = document.querySelector("#invoiceTable tbody");
            tbody.innerHTML = "";

            let subtotal = 0, totalDiscount = 0;

            items.forEach(item => {
                subtotal += item.totalBeforeDiscount;
                totalDiscount += item.discountAmount;

                tbody.innerHTML += `
          <tr>
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>${item.discount}%</td>
            <td>${item.total.toFixed(2)}</td>
          </tr>`;
            });

            const tax = (subtotal - totalDiscount) * TAX_RATE;
            const grandTotal = subtotal - totalDiscount + tax;

            document.getElementById("subtotal").textContent = subtotal.toFixed(2);
            document.getElementById("totalDiscount").textContent = totalDiscount.toFixed(2);
            document.getElementById("tax").textContent = tax.toFixed(2);
            document.getElementById("grandTotal").textContent = grandTotal.toFixed(2);

          
            localStorage.setItem("invoiceItems", JSON.stringify(items));
        }

        function clearInputs() {
            document.getElementById('itemName').value = "";
            document.getElementById('quantity').value = "";
            document.getElementById('price').value = "";
            document.getElementById('discount').value = "";
        }

        function resetInvoice() {
            items = [];
            updateTable();
            localStorage.removeItem("invoiceItems");
        }

        window.onload = () => {
            const saved = localStorage.getItem("invoiceItems");
            if (saved) {
                items = JSON.parse(saved);
                updateTable();
            }
        };