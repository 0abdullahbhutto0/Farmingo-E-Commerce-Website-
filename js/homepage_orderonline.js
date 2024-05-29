<script>
        document.addEventListener("DOMContentLoaded", function () {
            const plusButtons = document.querySelectorAll(".plus");
            const minusButtons = document.querySelectorAll(".minus");

            plusButtons.forEach(button => {
                button.addEventListener("click", function () {
                    const quantityElem = button.parentElement.querySelector(".quantity");
                    let quantity = parseInt(quantityElem.textContent) || 0;
                    quantity++;
                    quantityElem.textContent = quantity;
                });
            });

            minusButtons.forEach(button => {
                button.addEventListener("click", function () {
                    const quantityElem = button.parentElement.querySelector(".quantity");
                    let quantity = parseInt(quantityElem.textContent) || 0;
                    if (quantity > 0) {
                        quantity--;
                        quantityElem.textContent = quantity;
                    }
                });
            });
        });
    </script>