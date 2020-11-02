export interface EntityMapper<ORM_ENTITY, DOMAIN_ENTITY> {
  mapToDomain(ormEntity: ORM_ENTITY): DOMAIN_ENTITY;
  mapToOrm(domainEntity: DOMAIN_ENTITY): ORM_ENTITY;
}
