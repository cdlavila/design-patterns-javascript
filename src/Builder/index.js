/**
 * It makes sense to use the Builder pattern only when your products are quite
 * complex and require extensive configuration.
 *
 * Unlike in other creational patterns, different concrete builders can produce
 * unrelated products.
 * In other words, the results of various builders may not
 * always follow the same interface.
 */
class Product1 {
  constructor() {
    this.parts = [];
  }

  listParts() {
    console.log(`Product parts: ${this.parts.join(', ')}\n`);
  }
}

/**
 * The Builder interface specifies methods for creating the different parts of
 * the Product objects.
 */
class Builder {
  // Simulating an abstract methods here.
  buildPartA() {
    throw new Error('buildPartA() method must be implemented');
  }

  buildPartB() {
    throw new Error('buildPartB() method must be implemented');
  }

  buildPartC() {
    throw new Error('buildPartC() method must be implemented');
  }
}

/**
 * The Concrete Builder classes follow the Builder interface and provide
 * specific implementations of the building steps. Your program may have several
 * variations of Builders, implemented differently.
 */
class ConcreteBuilder1 extends Builder {
  constructor() {
    super();
    this.reset();
  }

  reset() {
    this.product = new Product1();
  }

  producePartA() {
    this.product.parts.push('PartA1');
  }

  producePartB() {
    this.product.parts.push('PartB1');
  }

  producePartC() {
    this.product.parts.push('PartC1');
  }

  /**
   * Concrete Builders are supposed to provide their own methods for
   * retrieving results. That's because various types of builders may create
   * entirely different products that don't follow the same interface.
   * Therefore, such methods cannot be declared in the base Builder interface
   * (at least in a statically typed programming language).
   *
   * Usually, after returning the end result to the client, a builder instance
   * is expected to be ready to start producing another product. That's why
   * it's a usual practice to call the reset method at the end of the
   * `getProduct` method body. However, this behavior is not mandatory, and
   * you can make your builders wait for an explicit reset call from the
   * client code before disposing of the previous result.
   */
  getProduct() {
    const result = this.product;
    this.reset();  // reset builder, it is SUPER IMPORTANT!
    return result;
  }
}

/**
 * The Director is only responsible for executing the building steps in a
 * particular sequence. It is helpful when producing products according to a
 * specific order or configuration. Strictly speaking, the Director class is
 * optional, since the client can control builders directly.
 */
class Director {
  /**
   * The Director works with any builder instance that the client code passes
   * to it. This way, the client code may alter the final type of the newly
   * assembled product.
   */
  setBuilder(builder) {
    this.builder = builder;
  }

  /**
   * The Director can construct several product variations using the same
   * building steps.
   */
  buildMinimalViableProduct() {
    this.builder.producePartA();
  }

  buildFullFeaturedProduct() {
    this.builder.producePartA();
    this.builder.producePartB();
    this.builder.producePartC();
  }
}

/**
 * The client code creates a builder object, passes it to the director and then
 * initiates the construction process. The end result is retrieved from the
 * builder object.
 */
function clientCode(director) {
  const builder = new ConcreteBuilder1();
  director.setBuilder(builder);

  console.log('Standard basic product:');
  director.buildMinimalViableProduct();
  builder.getProduct().listParts();

  console.log('Standard full featured product:');
  director.buildFullFeaturedProduct();
  builder.getProduct().listParts();

  // Remember, the Builder pattern can be used without a Director class.
  console.log('Custom product:');
  builder.producePartA();
  builder.producePartC();
  builder.getProduct().listParts();

  console.log('Remember that all outputs are different, due to the reset() method is called after each getProduct() call.');
}

const director = new Director();
clientCode(director);
