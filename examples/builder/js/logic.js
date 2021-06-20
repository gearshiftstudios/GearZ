( function () {
    /*
    
    Logic for the builder

    */ 

    class Logic {
        constructor ( gearz, threejs, scene ) {
            this.logger = gearz ? gearz.createLogger( '[ Logic ]' ) : null

            this.integrated = {
                cube: {
                    basic: true,
                    geometry: ( sX, sY, sZ ) => { return new threejs.BoxGeometry( sX ? sX : 2, sY ? sY : 5, sZ ? sZ : 2 ) },
                    material: () => { return new threejs.MeshStandardMaterial( { color: 'grey' } ) },
                }
            }

            this.scene = {
                add: {
                    object: ( type, position ) => {
                        const _type = type ? type : 'cube'

                        let geometry, material, object

                        if ( _type in this.integrated ) {
                            if ( this.integrated[ _type ].basic ) {
                                geometry = this.integrated[ _type ].geometry()
                                material = this.integrated[ _type ].material()
                            }

                            object = gearz.threeJS.mesh.create.regular( {
                                geometry: geometry,
                                material: material
                            } )

                            object.name = `object.${ gearz.operations.create.id() }`
                            
                            if ( !position ) object.position.y = object.geometry.parameters.height / 2

                            builder.objects.push( object ) 

                            gearz.threeJS.mesh.add( object, false ).to( scene, false )
                        } else this.log( `Object type not found in integrated list.`, 1 )
                    }
                }
            }
        }

        log ( content, type ) {
            const _content = content ? content : 'Message logged'

            let _type

            switch ( type ) {
                case 0:
                    _type = 'reg'
                    break
                case 1:
                    _type = 'error'
                    break

                default:
                    _type = 'reg'
                    break
            }

            if ( this.logger != null ) this.logger( _content )[ _type ]()
            else {
                if ( _type == 'reg' ) _type = 'log'

                console[ _type ]( _content )
            }
        } 
    }

    builder.logic = new Logic( gearz, threeLib, world.scene )
    builder.logic.scene.add.object()
} )()