#pragma strict

private var scanner : Vector3;
private var direction : Vector3;
private var newdirection : float;

private var justturn : boolean;
private var turntime : float;
private var wandertime : float;

public var advance : boolean;
private var speed : float;

private var angle : float;
private var rotationtime : float;

public var spotlight : GameObject;
private var lightdirection : Vector3;
private var lightnow : Quaternion;
private var lightnext : Quaternion;
private var lightwander : float;
private var lighttimer : float;

function Start () {
	
	advance = true;
	speed = 90f;
	
	direction = transform.forward;
	angle = 0f;
	
	rotationtime = Time.time;
	justturn = false;
	wandertime = 3f;
	
	lightdirection = Vector3(1,-1,1);
	lightnow = Quaternion.LookRotation(lightdirection, transform.up);
	lightnext = Quaternion.LookRotation(lightdirection, transform.up);
	lightwander = Time.time;
	
	advance = false;
}

function FixedUpdate () {
	
	if (advance == true){
		
		rigidbody.AddForce(direction * speed);
		
	}	
	
	//spotlight.transform.rotation = Quaternion.Slerp(lightnow, lightnext, Time.time * 0.8);
	
	if (Time.time >= lightwander){
		
		lightnow = lightnext;
		
		var angle1 : float = Random.value * 90;
		var angle2 : float = Random.value * 360;
		lightdirection = Vector3(Mathf.Cos(angle2), -Mathf.Sin(angle1), Mathf.Sin(angle2));
		
		lightnext = Quaternion.LookRotation(lightdirection, transform.up);
		
		lightwander = Time.time + 2 + Random.value * 4;
		lighttimer = Time.time;
	}
	
	spotlight.transform.rotation = Quaternion.Slerp(lightnow, lightnext, (Time.time - lighttimer) * 0.8);
	
	if (Time.time - rotationtime >= 0.05){
		
		angle = (angle + 0.4);	
		
		if (angle >= 6.28){
		
			angle = 0;
			
		}	
		
		scanner = Vector3(Mathf.Cos(angle),0,Mathf.Sin(angle));
		
		rotationtime = Time.time;
		
	}
	
	//Debug.DrawRay (transform.position, scanner * 10, Color.red);
	//Debug.DrawRay (transform.position, direction * 15, Color.green);
	Debug.DrawRay (spotlight.transform.position, lightdirection * 15, Color.magenta);
	
	if (Time.time - turntime >= 1){
		
		justturn = false;
	
	}
	
	if (Time.time - wandertime >= 0){
		
		direction = Quaternion.AngleAxis((Random.value * 150 - 75), Vector3.up) * direction;
		
		wandertime =  Random.value * 7 + Time.time + 2;
	
	}
	
	var hit : RaycastHit;
	
	if (Physics.SphereCast(transform.position, 2f, scanner, hit, 10f)){
		
		if (justturn == false){
		
			newdirection = angle + (0.5 * 3.14) + (Random.value * 3.14);
		
			direction = Vector3(Mathf.Cos(newdirection),0,Mathf.Sin(newdirection));
			
			justturn = true;
			turntime = Time.time;
			
			wandertime =  Random.value * 7 + Time.time + 2;
		}
	}
}