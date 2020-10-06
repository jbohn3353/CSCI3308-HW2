describe('Given a function isEmpty(samplestring)', function() {
   
    describe('When samplestring is a non-empty string', function() {
  
      it('Then the function returns false', function() {
        expect(isEmpty("test")).toBe(false);
      });
    });
  
    describe("When samplestring is an empty string", function(){
        it("Then the function returns true", function() {
            expect(isEmpty("")).toEqual(true);
        });
    });

    describe("When samplestring is undefined", function(){
        it("Then the function returns true", function() {
            expect(isEmpty(undefined)).toEqual(true);
        });
    });
  });