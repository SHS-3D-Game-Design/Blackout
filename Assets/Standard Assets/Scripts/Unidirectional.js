#pragma strict

private var advance : boolean;
private var turn : int;

public var thrust : float;

private var huntmode : int;
private var wandertime : float;

private var directionl : Vector3;
private var directionr : Vector3;
private var leftflag : boolean;
private var rightflag : boolean;
private var hitl : RaycastHit;
private var hitr : RaycastHit;

function Start () {
	
	advance = true;
	
	thrust = 27f;
	
	huntmode = 3;
	
	wandertime = 3;
}

function FixedUpdate () {
	if (advance == true){
		rigidbody.AddForce(transform.forward * thrust);
	}	
	
	directionr = transform.TransformDirection(Vector3(0.1, 0, 1));
	directionl = transform.TransformDirection(Vector3(-0.1, 0, 1));
		
	Debug.DrawRay (transform.position, directionr * 15, Color.cyan);
	Debug.DrawRay (transform.position, directionl * 15, Color.black);
		
	if (Physics.Raycast(transform.position, directionl, hitl, 15)){
		leftflag = true;
	}
	else{
		leftflag = false;
		hitl.distance = 16;
	}		
		
	if (Physics.Raycast(transform.position, directionr, hitr, 15)){
		rightflag = true;
	}
	else{
		rightflag = false;
		hitr.distance = 16;
	}
	
	if (hitr.distance > hitl.distance){
		rigidbody.AddTorque(transform.up * (Random.value * 7 + 3));
	}	
	
	if (hitr.distance < hitl.distance){
		rigidbody.AddTorque(-transform.up * (Random.value * 7 + 3));
	}
	
	
	if (huntmode == 3){
		
		//if (Physics.Raycast(transform.position, transform.forward, 10)){
			//wandertime = Time.time;
		//}
		
		
		
		if (Time.time >= wandertime){
		
			if (Random.value >= 0.5){
				rigidbody.AddTorque(transform.up * (Random.value * 10.0));
			}
			
			else {
				rigidbody.AddTorque(-transform.up * (Random.value * 10.0));
			}
				
			wandertime = Time.time + Random.value * 5 + 0.5;	
		}
		
		var hit : RaycastHit;
		
		Physics.SphereCast(transform.position, 20, transform.forward, hit, 10);
		if (hit.collider.tag == "Player"){
			
			huntmode = 1;
		 	advance = false;
		  
		   
		}     
		
	}
	
	
}
