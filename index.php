<?php require_once('assets/php/includes/header.php') ?>

<!-- Send Transaction Modal -->
<div class="modal fade" id="sendTransaction" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Enviar transação</h5>
      </div>
      <div class="modal-body">
        <form id="form-sendTransaction">
            <div class="row">
                <div class="col-md-8">
                    <div class="form-group">
                        <label for="to">Endereço destino</label>
                        <input type="text" class="form-control" id="to" name="to" placeholder="0x123">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="value">Valor</label>
                        <input type="number" class="form-control" id="value" name="value" placeholder="0.001">
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-6 my-auto">
                    <small class="text-secondary">Gas calculado automáticamente</small>
                </div>
                <div class="col-md-6 text-end">
                    <button class="w-100 btn btn-primary">
                        Enviar
                    </button>
                </div>
            </div>
        </form>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="viewBalance" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Ver saldo</h5>
      </div>
      <div class="modal-body">
        <span class="balance"></span>
      </div>
    </div>
  </div>
</div>

<div class="vw-100 vh-100 row m-0">
    <div class="mx-auto text-center my-auto w-auto">
        <div class="card p-4 text-center">
            <h4 class="text-primary mb-4">Web3 Connect</h4>
            <button class="btn btn-primary connect-wallet mx-auto">
                <i class="bi bi-wallet pe-1"></i> Conectar
            </button>
            <div class="account d-none">
                <h5 class="mb-0"><b>Conta:</b></h5>
                <h6 class="text-secondary"></h6>
                <div class="chain text-secondary">
                    <img>
                    <small></small>
                </div>
            </div>
            <div class="actions mt-4 d-none">
                <div class="row">
                    <div class="col-md mb-md-0 mb-2">
                        <button class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#sendTransaction">
                            <i class="bi bi-send pe-1"></i> Enviar transação
                        </button>
                    </div>
                    <div class="col-md">
                        <button class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#viewBalance" onclick="setBalance()">
                            <i class="bi bi-piggy-bank pe-1"></i> Ver saldo
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <small class="text-secondary mt-2 d-block">
            Desenvolvido por <a href="https://github.com/JulimarJunior" target="_blank">Julimar Jr.</a>
        </small>
    </div>
</div>

<div class="alert mt-3" style="display: none" role="alert"></div>

<?php require_once('assets/php/includes/footer.php') ?>