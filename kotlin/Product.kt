// Ejercicio Kotlin · Parte 4

class Product(
    val id: Int,
    val name: String,
    val price: Double,
    val category: String,
    var stock: Int?
)

// null → Sin dato
// 0 → Agotado
// 1 a 4 → Pocas unidades
// 5 o más → Disponible
fun stockLabel(stock: Int?): String {
    return when {
        stock == null -> "Sin dato"
        stock == 0 -> "Agotado"
        stock < 5 -> "Pocas unidades"
        else -> "Disponible"
    }
}

// Calcula el precio después de aplicar el descuento.
fun applyDiscount(price: Double, percent: Int): Double {
    return price * (1 - percent / 100.0)
}

fun main() {
    val products = listOf(
        Product(1, "Agua mineral", 1800.0, "Bebidas", 120),
        Product(2, "Galletas", 2700.0, "Snacks", 0),
        Product(3, "Jugo de naranja", 5200.0, "Bebidas", null)
    )

    for (product in products) {
        println("Producto: ${product.name}")
        println("Stock: ${stockLabel(product.stock)}")
        println("Precio con descuento: ${applyDiscount(product.price, 10)}")
        println("-------------------------")
    }
}