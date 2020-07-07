export default function proposal(parent, nanny, trueNannyId) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Document</title>
      </head>
      <body>
        <div class="card mb-3"
          style="max-width: 540px; margin-left: auto; margin-right: auto; border: 5px solid #58595B; border-radius:5%;">
          <div class="row no-gutters" style="text-align: center;">
            <div class="col-md-4" style="text-align: center;">
              <h1 style="text-align: center;">Nanny Hiring Proposal</h1>
              <img src="https://i.imgur.com/aByakG8.png" class="logo-footer" style="height: 250px;">
            </div>
            <div class="col-md-8" style="text-align: center;">
              <div class="card-body" style="text-align: center;">
                <hr>
                <h2 class="card-title">This nanny hiring proposal is from:</h2>
                <p class="card-text">Name: ${parent.name}</p>
                <p class="card-text">Email: ${parent.email}</p>
                <p class="card-text">Phone number: ${parent.phoneNumber}</p>
                <p class="card-text">City: ${parent.city}</p>
                <p class="card-text">Address: ${parent.address}</p>
                <hr>
                <p class="card-text">${parent.name} wants to hire: </p>
                <div class="col-md-4" style="text-align: center;">
                  <img src="${nanny.imageUrl}" class="logo-footer" style="height: 250px;">
                </div>
                <p class="card-text">Nanny's name: ${nanny.name}</p>
                <p class="card-text">Nanny's gender: ${nanny.gender}</p>
                <p class="card-text">Nanny's phone number: ${nanny.phoneNumber}</p>
                <p class="card-text">Nanny's birth date: ${nanny.birthDate}</p>
                <hr>
                <div class="card">
                  Do you accept this proposal?<br>
                  <form action="https://super-nanny555.herokuapp.com/emailing/agency/accept" method="POST">
                    <input type="hidden" id="parentId" name="parentId" value="${parent.id}">
                    <input type="hidden" id="nannyId" name="nannyId" value="${trueNannyId}">
                    <input type="hidden" id="agencyId" name="agencyId" value="${nanny.Agency.id}">
                    <input type="submit" value="YES">
                  </form><br>
                  <form action="https://super-nanny555.herokuapp.com/emailing/agency/refuse" method="POST">
                    <input type="hidden" id="parentId" name="parentId" value="${parent.id}">
                    <input type="hidden" id="nannyId" name="nannyId" value="${trueNannyId}">
                    <input type="hidden" id="agencyId" name="agencyId" value="${nanny.AgencyId}}">
                    <input type="submit" value="NO">
                  </form>
                </div>
              </div>
              <h6 style="color: grey; text-align: center;">© Super Nanny 2020. All rights reserved</h6>
            </div>
          </div>
        </div>
      </body>
      </html>
      `;
  }