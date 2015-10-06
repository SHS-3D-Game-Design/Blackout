#pragma strict

public var beam : ParticleSystem;
public var blast : GameObject;

function Start () {
	
	beam.enableEmission = false;

}

function Update () {
	
	var hit : RaycastHit;
	
	if (Input.GetKeyDown(KeyCode.Q)){
		
		beam.enableEmission = true;
		
		if (Physics.Raycast(transform.position, transform.forward, hit, 40)){
		
			if (hit.transform.gameObject.tag == "Target"){
				
				hit.transform.SendMessage ("ShotByStirling");
		
			}
		
		}
		
	}
	
	if (Input.GetKeyUp(KeyCode.Q)){
		
		beam.enableEmission = false;
	
	}
	
	if (Input.GetKey(KeyCode.E)){
	
		
        
	
	
		
			
				
	}				
							
}