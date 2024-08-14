export class MockResponseProductSuccess {
  static mockResGetProducts() {
    return {
      status: 'Success',
      code: 200,
      message: 'Data products success to retrieved',
      data: {
        products: [
          this.mockProductData('Product 1'),
          this.mockProductData('Product 2'),
        ],
      },
    };
  }

  static mockResGetProduct() {
    return {
      status: 'Success',
      code: 200,
      message: 'Data product by id success to retrieved',
      data: {
        product: {
          ...this.mockProductData('Product 1'),
          owner: {
            userCode: 'usr-efebc453',
            email: 'user_17@gmail.com',
            avatar:
              'https://ui-avatars.com/api?name=&bold=user_17true&rounded=true&format=svg&background=random',
          },
        },
      },
    };
  }

  static mockResAddProduct() {
    return {
      status: 'Success',
      code: 201,
      message: 'Product product 1 has been created',
      data: {
        Product: this.mockProductData('Product 1'),
      },
    };
  }

  static mockResUpdateProduct() {
    return {
      status: 'Success',
      code: 200,
      message:
        'Data product with product code prd-292jdh31 success to be change',
    };
  }

  static mockResDeleteProduct() {
    return {
      status: 'Success',
      code: 200,
      message: 'Data product with product code prd-292jdh31 has been deleted',
    };
  }

  static mockProductData(name: string) {
    return {
      productCode: 'prd-c262661b',
      name: name,
      description: `${name} desc`,
      price: 14000,
      stock: 4,
      createdAt: '2024-08-13T07:22:21.783Z',
      updatedAt: '2024-08-13T09:21:52.228Z',
    };
  }
}
