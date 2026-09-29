import {FinanceCalculator, Order, OrderManagement, Validator} from "../src/app";

describe("OrderManagement", () => {

    //before all, new validator and new calculator
    //before each, new order manager
    let validator: Validator;
    let calc: FinanceCalculator;
    let orderManager: OrderManagement;
    let baseValidator: (order: Order) => void;

    beforeAll(() => {
        validator = new Validator();
        calc = new FinanceCalculator();
    });
    beforeEach(() => {
        baseValidator = validator.validate;
        validator.validate = jest.fn();
        orderManager = new OrderManagement(validator, calc);
    });
    afterEach(() => {
        validator.validate = baseValidator;
    });
    it("should add an order", () => {
        //Arrange
        const item = "Sponge";
        const price = 15;

        //Act
        orderManager.addOrder(item, price);

        //Assert
        expect(orderManager.getOrders()).toEqual([{id:1, item, price}]);
    });

    it("should get an order", () => {
        //Arrange
        const item = "Sponge";
        const price = 15;
        orderManager.addOrder(item, price);

        //Act
        const order = orderManager.getOrder(1);

        //Assert
        expect(order).toEqual({id:1, item, price});
    });

    it("should call finance Calculator getRevenue", () => {
        //Arrange
        const item = "Sponge";
        const price = 15;
        orderManager.addOrder(item, price);
        const spy = jest.spyOn(calc, "getRevenue");

        //Act
        orderManager.getTotalRevenue();

        //Assert
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith([{id:1, item, price}]);
        expect(spy).toHaveReturnedWith(15);
    });

    it("should throw addition exception if validator does not pass", () => {
        //Arrange
        const item = "Sponge";
        const price = 10;
        (validator.validate as jest.Mock).mockImplementation(() => {
            throw new Error("Invalid order");
        });

        //Act and Assert
        expect(() => orderManager.addOrder(item, price)).toThrow("[OrderManagement] Error adding order: Invalid order");
    });

});

describe("FinanceCalculator", () => {
    it("should get the total revenue", () => {
        //Arrange
        const calc = new FinanceCalculator();
        const orders = [
            {id: 1, item: "Sponge", price: 15},
            {id: 2, item: "Chocolate", price: 10},
            {id: 3, item: "Fruit", price: 10}
        ];

        //Act
        const revenue = calc.getRevenue(orders);

        //Assert
        expect(revenue).toEqual(35)
    });

    it("should get the average buy power", () => {
        //Arrange
        const calc = new FinanceCalculator();
        const orders = [
            {id:1, item:"Sponge", price: 15},
            {id:2, item:"Chocolate", price: 10},
            {id:3, item:"Fruit", price: 10}
        ];

        //Act
        const buyPower = calc.getAverageBuyPower(orders);

        //Assert
        expect(buyPower).toBeCloseTo(11.67, 2);
    });
})
