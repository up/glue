/*jslint browser:true */
/*global describe:true, it:true, expect:true, glue:true */

describe("glue.template.js ..............................................................", function () {

  describe("glue.template()", function() {
    it("Define and use a HTML templates", function () {
      
      var locationTmpl = glue.template("Location {{place}}, {{address.street}} {{address.number}}.");
      var location = locationTmpl({
        place: "Berlin",
        address: {
          street: "Schönhauser Straße",
          number: "999"
        }
      });
      
      expect(location).toBe("Location Berlin, Schönhauser Straße 999.");

    });
  });
      
});
