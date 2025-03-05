<template>
    <div class="modal-overlay">
        <div class="modal-content">
            <h2>{{ product.id ? 'Update Product' : 'New Product' }}</h2>
            <label for="name">Name:</label>
            <input type="text" v-model="localProduct.name" id="name" required />
            <label for="description">Description:</label>
            <input type="text" v-model="localProduct.description" id="description" required />
            <label for="price">Price:</label>
            <input type="text" v-model="localProduct.price" id="price" required />
            <label for="Category">Category:</label>
            <input type="text" v-model="localProduct.category" id="category" required />
            <label for="images">Image URLs:</label>
            <input type="text" v-model="localProduct.images" id="images" required />
            <button @click="save">Save</button>
            <button @click="$emit('close')">Cancel</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProductModalView",
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            localProduct: { ...this.product }
        };
    },
    methods: {
        save() {
            this.$emit("save", this.localProduct);
        }
    },
    watch: {
        product: {
            handler(newProduct) {
                this.localProduct = { ...newProduct };
            },
            deep: true,
            immediate: true
        }
    }
};
</script>
<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8); 
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background:white;
    padding: 30px;
    border-radius: 10px;
    width: 400px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    color: white;
    box-sizing: border-box;
}

.modal-content h2 {
    margin: 0 0 20px;
    font-size: 1.8em;
    color: #444;
    text-align: center;
}

.modal-content label {
    display: block;
    margin: 15px 0 5px;
    color: #444;
    font-weight: bold;
}

.modal-content input {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid crimson;
    border-radius: 5px;
    background-color: white;
    color: #333;
    box-sizing: border-box;
}

.modal-content button {
    margin-right: 10px;
    padding: 10px 20px;
    border: 1px solid black;
    background: white;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.modal-content button:hover {
    background-color: crimson;
    border: none; 
    font-weight: bold;
    transform: translateY(-2px);
}

.modal-content button:last-child {
    background-color: crimson; 
    color: white;
}

.modal-content button:last-child:hover {
    background-color: #333; 
}
</style>