const baseUrl = "https://c5af-190-238-238-228.ngrok-free.app/api/v1.0"

export const fetchEntities = async () =>  (await fetch(`${baseUrl}/entity`)).json();

