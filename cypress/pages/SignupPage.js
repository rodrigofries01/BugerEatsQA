class SignupPage {
	go() {
		cy.viewport(1440, 900);
		cy.visit('https://buger-eats-qa.vercel.app/');

		cy.get('a[href="/deliver"]').click();
		cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas');
	}

	fillForm(deliver) {
		// informações pessoais
		cy.get('input[name="fullName"]').type(deliver.name);
		cy.get('input[name="cpf"]').type(deliver.cpf);
		cy.get('input[name="email"]').type(deliver.email);
		cy.get('input[name="whatsapp"]').type(deliver.whatsapp);

		// endereço
		cy.get('input[name="postalcode"]').type(deliver.address.postalcode);
		cy.get('input[type="button"][value="Buscar CEP"]').click();

		cy.get('input[name="address-number"]').type(deliver.address.number);
		cy.get('input[name="address-details"]').type(deliver.address.details);

		cy.get('input[name="address"]').should('have.value', deliver.address.street);
		cy.get('input[name="district"]').should('have.value', deliver.address.district);
		cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state);

		// metodo de entrega
		cy.contains('.delivery-method li', deliver.delivery_method).click();

		// Upload de foto
		cy.get('.dropzone input[accept^="image"]').attachFile('/images/' + deliver.cnh);
	}

	submit() {
		// Confirmando cadastro
		// cy.get('button[type="submit"]').click();
		cy.get('button').contains('Cadastre-se para fazer entregas').click()
		cy.wait(200);
	}

	modalContentShouldBe(expectedMessage) {
		cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage);
	}

	alertMessageShouldBe(expectedMessage) {
		// cy.get('.alert-error').should('have.text', expectedMessage);
		cy.contains('.alert-error', expectedMessage).should('be.visible');
	}

	closeModal() {
		//fechar modal
		cy.get('.swal2-container .swal2-actions .swal2-confirm').click();
	}
}

export default new SignupPage;
